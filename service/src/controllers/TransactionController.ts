import { AccountController } from "./AccountController";
import { userRepository } from "../domain/repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";
import { Response } from "express";
import { Request } from "express";
import { verify } from "jsonwebtoken";
import { TransactionRepository } from "../domain/repositories/TransactionRespository";
import { transações } from "../domain/entities/transações";

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
        decodedToken.account.id
      );
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
        Number(accountIdOUT?.balance) - Number(value)
      );
      await new AccountController().UpdateAccount(
        accountIdIN?.id,
        Number(accountIdIN?.balance) + Number(value)
      );

      const newTransaction = TransactionRepository.create({
        debitedAccountId: accountIdOUT?.id,
        creditedAccountId: accountIdIN?.id,
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
                debitedAccountId: Number(decodedToken.id),
              },
              order: orderParams,
            }
          : {
              where: {
                debitedAccountId: Number(decodedToken.id),
              },
            }
      );

      const Transactionsin = await TransactionRepository.find(
        filter || order || desc
          ? {
              where: {
                creditedAccountId: Number(decodedToken.id),
              },
              order: orderParams,
            }
          : {
              where: {
                creditedAccountId: Number(decodedToken.id),
              },
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

      const UserTransaction = async (id: number) => {
        const userT = await userRepository.findOneBy({
          accountId: Number(id),
        });
        return String(userT?.username);
      };

      // let transaçõesFormate: any[] = [];
      // transações.map((e) => {
      //   let username = UserTransaction(
      //     e.debitedAccountId === decodedToken.account.id
      //       ? e.creditedAccountId
      //       : e.debitedAccountId
      //   );
      //   transaçõesFormate = [{e, username}] ;
      // });

      res
        .status(200)
        .json(
          transações.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
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
