import { AccountController } from "./AccountController";
import { userRepository } from "../domain/repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import { Response } from "express";
import { Request } from "express";
import { verify } from "jsonwebtoken";
import { TransactionRepository } from "../domain/repositories/TransactionRespository";

export class TransactionController {
  async CreateTransaction(req: Request, res: Response) {
    try {
      const { usernameIN, value } = req.body;
      const token: any = req.headers.authorization;
      const decodedToken: any = verify(token, String(process.env.JWT_PASS));

      const userExistIN = await userRepository.findOneBy({
        username: usernameIN,
      });
      if (!userExistIN) {
        throw new BadRequestError("user not exists");
      }
      if (Number(decodedToken.id) === userExistIN.id) {
        return res.status(400).json({ message: "Cannot transfer to yourself" });
      }

      const accountIdOUT = await new AccountController().ListAccount(
        decodedToken.accountId.id
      );
      const accountIdIN = await new AccountController().ListAccount(
        userExistIN.accountId.id
      );

      if (!accountIdOUT || !accountIdIN) {
        return res.status(400).json({ message: "Account not exists" });
      }

      if (accountIdOUT?.balance < value) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      await new AccountController().UpdateAccount(
        accountIdOUT?.id,
        Number(accountIdOUT?.balance) - Number(value)
      );
      await new AccountController().UpdateAccount(
        accountIdIN?.id,
        Number(accountIdIN?.balance) + Number(value)
      );

      const newTransaction = TransactionRepository.create({
        debitedAccountId: accountIdOUT,
        creditedAccountId: accountIdIN,
        value,
      });

      await TransactionRepository.save(newTransaction);

      return res.status(201).json(newTransaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async ListTransaction(req: Request, res: Response) {
    try {
      const token: any = req.headers.authorization;
      const decodedToken: any = verify(token, String(process.env.JWT_PASS));
      const { filter, order, desc } = req.query;

      let orderParams: any = {};
      orderParams[String(order)] = desc === "false" ? "ASC" : "DESC";

      const Transactionsout = await TransactionRepository.find(
        filter || order || desc
          ? {
              where: {
                debitedAccountId: decodedToken.id,
              },
              order: orderParams,
              relations: ["creditedAccountId"],
            }
          : {
              where: {
                debitedAccountId: decodedToken.id,
              },
              relations: ["creditedAccountId"],
            }
      );

      const Transactionsin = await TransactionRepository.find(
        filter || order || desc
          ? {
              where: {
                creditedAccountId: decodedToken,
              },
              order: orderParams,
              relations: ["debitedAccountId"],
            }
          : {
              where: {
                creditedAccountId: decodedToken,
              },
              relations: ["debitedAccountId"],
            }
      );

      if (filter) {
        if (filter === "cash-out") return res.status(200).json(Transactionsout);
        else if (filter === "cash-in")
          return res.status(200).json(Transactionsin);
      }

      const transações: any[] = [];
      Transactionsout?.map((e) => transações.push(e));
      Transactionsin?.map((e) => transações.push(e));

      res
        .status(200)
        .json(
          transações.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
        );
    } catch (error: any) {
      res.status(400).json({ message: error.message });
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
