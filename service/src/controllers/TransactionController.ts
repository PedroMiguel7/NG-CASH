import { AccountController } from "./AccountController";
import { userRepository } from "../domain/repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import { Response } from "express";
import { Request } from "express";
import { TransactionRepository } from "../domain/repositories/TransactionRespository";

export class TransactionController {
  async CreateTransaction(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const { accountId, usernameIN, value } = req.body;

      const userExistIN = await userRepository.findOneBy({
        username: usernameIN,
      });
      if (!userExistIN) {
        throw new BadRequestError("user not exists");
      }
      if (Number(user_id) === userExistIN.id) {
        return res.status(400).json({ message: "Cannot transfer to yourself" });
      }

      const accountIdOUT = await new AccountController().ListAccount(accountId);
      const accountIdIN = await new AccountController().ListAccount(
        userExistIN.accountId
      );
      if (!accountIdOUT || !accountIdIN) {
        return res.status(400).json({ message: "Account not exists" });
      }

      if (accountIdOUT?.balance < value) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      await new AccountController().UpdateAccount(
        accountIdOUT?.id,
        accountIdOUT?.balance - value
      );
      await new AccountController().UpdateAccount(
        accountIdIN?.id,
        accountIdIN?.balance + value
      );

      const newTransaction = TransactionRepository.create({
        debitedAccountId: accountIdOUT?.id,
        creditedAccountId: accountIdIN?.id,
        value,
      });

      await TransactionRepository.save(newTransaction);

      return res.status(201).json(newTransaction);
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  async ListTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { filter, order, desc } = req.query;

      let orderParams: any = {}
      orderParams[String(order)] = desc === 'false' ? "ASC": "DESC"

      const Transactionsout = await TransactionRepository.find({
        where: {
          debitedAccountId: Number(id)
        }, order: orderParams
      });
      const Transactionsin = await TransactionRepository.find({
        where: {
          creditedAccountId: Number(id)
        }, order: orderParams
      });
      if (!Transactionsout) {
        throw new BadRequestError("Transactions not found");
      }
      if (!Transactionsin) {
        throw new BadRequestError("Transactions not found");
      }

      if (filter === "cash-out") return res.status(200).json(Transactionsout);
      else if (filter === "cash-in") return res.status(200).json(Transactionsin);
      else return res.status(200).json(
        {cashOut: Transactionsout, cashIn: Transactionsin}
        );

    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }

  async DelTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const Transaction = await TransactionRepository.findOneBy({
        id: Number(id),
      });

      if (!Transaction) {
        throw new BadRequestError("Transaction not found");
      }
      userRepository.delete(id);

      return res.status(200).json({ message: "sucess delete" });
    } catch (error: any) {
      res.status(400).json({ message: "Deu ruim" });
    }
  }
}
