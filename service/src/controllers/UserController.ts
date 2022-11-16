import { AccountController } from "./AccountController";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import { Response } from "express";
import { Request } from "express";
import bcrypt from "bcrypt";

export class UserController {
  async CreateUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (username.length <= 3) {
        throw new BadRequestError(
          "Enter a username with at least 3 characters"
        );
      }
      if (password.length <= 8) {
        throw new BadRequestError(
          "Enter a password with at least 8 characters"
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
        accountId: accountId?.id,
      });

      await userRepository.save(newUser);

      const { password: _, ...user } = newUser;

      return res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  async ListUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const { id } = req.body;

      // if (id !== user_id) {
      //   return { message: "Deu ruim" };
      // }

      const user = await userRepository.findOneBy({ id: Number(user_id) });
      if (!user) {
        throw new BadRequestError("User not found");
      }

      var account;
      if (user.accountId) {
        account = await new AccountController().ListAccount(user.accountId);
      }

      let { password: _, ...USER } = user;

      if (account) {
        const USERformat = {
          id: USER.id,
          username: USER.username,
          account: account,
        };
        return res.status(201).json(USERformat);
      }

      return res.status(201).json(USER);
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  // precisa atualizar o retorno
  async UpdateUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const { username } = req.body;

      const user = await userRepository.findOneBy({ id: Number(user_id) });

      if (!user) {
        throw new BadRequestError("User not found");
      }

      await userRepository
        .createQueryBuilder()
        .update({ username: username })
        .where({ id: user_id })
        .execute();

      const { password: _, ...userResponse } = user;

      return res.status(200).json({ userResponse });
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  async DelUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const user = await userRepository.findOneBy({ id: Number(user_id) });

      if (!user) {
        throw new BadRequestError("User not found");
      }
      userRepository.delete(user_id);

      return res.status(200).json({ message: "sucess delete" });
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }
}
