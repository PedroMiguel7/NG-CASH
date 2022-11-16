import { userRepository } from "./../domain/repositories/userRepository";
import { Response } from "express";
import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class LoginController {
  async Login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await userRepository.findOneBy({ username });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const varifypass = await bcrypt.compare(password, user.password);
      if (!varifypass) {
        throw new Error("Invalid email or password");
      }
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_PASS ?? "",
        { expiresIn: "24h" }
      );

      return res.status(200).json({ token });
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }
}
