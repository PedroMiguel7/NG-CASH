import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import { Response } from "express";
import { Request } from "express";
import bcrypt from "bcrypt";
import { Console } from "console";

export class UserController {
  async CreateUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const userExist = await userRepository.findOneBy({ username });

      if (userExist) {
        throw new BadRequestError("Email already exists");
      }

      const criptopass = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        username,
        password: criptopass,
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
      const users = await userRepository.find();

      if (!users) {
        throw new BadRequestError("Users not found");
      }

      var USERS = [];
      for (let i = 0; i < users.length; i++) {
        let { password: _, ...usersList } = users[i];
        USERS.push(usersList);
      }

      return res.status(201).json(USERS);
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  async UpdateUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const { username } = req.body;
      console.log("🚀 ~ file: UserController.ts ~ line 65 ~ UserController ~ UpdateUser ~ req.body", req.body)
      console.log("🚀 ~ file: UserController.ts ~ line 65 ~ UserController ~ UpdateUser ~ username", username)


      const user = await userRepository.findOneBy({ id: Number(user_id) });

      if (!user) {
        throw new BadRequestError("User not found");
      }

      
      let usernameUp = username
      
      await userRepository
        .createQueryBuilder()
        .update(user)
        .set({ username: usernameUp })
        .where(`id = ${user_id}`)
        .execute();

      const { password: _, ...userUpdate } = user;

      return res.status(200).json({ userUpdate });
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
