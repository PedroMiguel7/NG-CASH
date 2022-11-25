import { Accounts } from "./../domain/entities/Account";
import { userRepository } from "./../domain/repositories/userRepository";
import { Response } from "express";
import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AccountController } from "./AccountController";

export class LoginController {
  async Login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await userRepository.findOne({
        where: { username },
        relations: ["account"],
      });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const varifypass = await bcrypt.compare(password, user.password);
      if (!varifypass) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign(
        { user },
        process.env.JWT_PASS ?? "",
        { expiresIn: "24h" }
      );

      return res.status(200).json({ token });
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }
}
