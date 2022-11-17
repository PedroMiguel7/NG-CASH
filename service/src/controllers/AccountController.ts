import { userRepository } from "../domain/repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import { Response } from "express";
import { Request } from "express";
import { AccountRepository } from "../domain/repositories/AccountRepository";

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
        return null;
      }

      return Account;
    } catch (error: any) {
      ({ message: "Deu ruim" });
    }
  }

  // preciso atualizar
  async UpdateAccount(id: number, value: number) {
    try {
      const Account = await AccountRepository.findOneBy({ id: Number(id) });

      if (!Account) {
        throw new BadRequestError("Account not found");
      }

      await AccountRepository.createQueryBuilder()
        .update(Account)
        .set({ balance: value })
        .where({id: id})
        .execute();

      return Account;
    } catch (error: any) {
      return { message: "Deu ruim" };
    }
  }

  async DelAccount(id: number) {
    try {
      const Account = await userRepository.findOneBy({ id: Number(id) });

      if (!Account) {
        throw new BadRequestError("Account not found");
      }
      userRepository.delete(id);

      return ({ message: "sucess delete" });
    } catch (error: any) {
      ({ message: "Deu ruim" });
    }
  }
}
