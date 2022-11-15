import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import { Response } from "express";
import { Request } from "express";
import { AccountRepository } from "../repositories/AccountRepository";

export class AccountController {
  async CreateAccount() {
    try {
      const newAccount = AccountRepository.create({
        balance: 100,
      });

      await AccountRepository.save(newAccount);

      return newAccount;
    } catch (error: any) {
      ("Deu ruim");
    }
  }

  async ListAccount(id: number) {
    try {
      const Account = await AccountRepository.findOneBy({ id: id });

      if (!Account) {
        return null
      }

      return Account;
    } catch (error: any) {
      ({ message: "Deu ruim" });
    }
  }

  async UpdateAccount(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username } = req.body;

      const Account = await AccountRepository.findOneBy({ id: Number(id) });

      if (!Account) {
        throw new BadRequestError("Account not found");
      }


      await userRepository
        .createQueryBuilder()
        .update(Account)
        .set({})
        .where(`id = ${id}`)
        .execute();


      return res.status(200).json({ Account });
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  async DelAccount(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const Account = await userRepository.findOneBy({ id: Number(id) });

      if (!Account) {
        throw new BadRequestError("Account not found");
      }
      userRepository.delete(id);

      return res.status(200).json({ message: "sucess delete" });
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }
}
