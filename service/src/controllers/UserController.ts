import { AccountController } from "./AccountController";
import { userRepository } from "../domain/repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import { Response } from "express";
import { Request } from "express";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";

export class UserController {
  async CreateUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const verifypass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;

      if (username.length <= 3) {
        throw new BadRequestError(
          "Enter a username with at least 3 characters"
        );
      }
      if (!verifypass.test(password)) {
        throw new BadRequestError(
          "Enter a password with at least 8 characters, one uppercase letter and one special character"
        );
      }

      const userExist = await userRepository.findOneBy({ username });

      if (userExist) {
        throw new BadRequestError("username already exists");
      }

      const criptopass = await bcrypt.hash(password, 10);

      const accountId = await new AccountController().CreateAccount();

      const newUser = userRepository.create({
        username,
        password: criptopass,
        account: accountId,
      });

      await userRepository.save(newUser);

      const { password: _, ...user } = newUser;

      return res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  async ListUserAccount(req: Request, res: Response) {
    try {
      const token: any = req.headers.authorization;
      const decodedToken: any = verify(token, String(process.env.JWT_PASS));

      const user = await userRepository.findOne({
        where: {
          id: Number(decodedToken.user.id),
        },
        relations: ["account"],
      });
      if (!user) {
        throw new BadRequestError("User not found");
      }

      var account;
      if (user.account) {
        account = await new AccountController().ListAccount(user.account.id);
      }

      let { password: _, ...USER } = user;

      if (account) {
        const USERformat = {
          id: USER.id,
          username: USER.username,
          account: account,
        };
        return res.status(200).json(USERformat);
      }

      return res.status(200).json(USER);
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  // precisa atualizar o retorno
  async UpdateUser(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const token: any = req.headers.authorization;
      const decodedToken: any = verify(token, String(process.env.JWT_PASS));

      const user = await userRepository.findOneBy({
        id: Number(decodedToken.user.id),
      });

      if (!user) {
        throw new BadRequestError("User not found");
      }

      await userRepository
        .createQueryBuilder()
        .update({ username: username })
        .where({ id: decodedToken.user.id })
        .execute();

      const { password: _, ...userResponse } = user;

      return res.status(200).json({ userResponse });
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  async DelUser(req: Request, res: Response) {
    try {
      const token: any = req.headers.authorization;
      const decodedToken: any = verify(token, String(process.env.JWT_PASS));
      const user = await userRepository.findOneBy({
        id: Number(decodedToken.user.id),
      });

      if (!user) {
        throw new BadRequestError("User not found");
      }

      userRepository.delete(decodedToken.user.id);

      const accountId = await new AccountController().DelAccount(
        user.account.id
      );

      return res.status(200).json({ message: "sucess delete" });
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }
}
