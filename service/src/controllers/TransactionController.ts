import { Users } from "./../domain/entities/User";
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

      const userExistIN = await userRepository.findOne({
        where: {
          username: usernameIN,
        },
        relations: ["account"],
      });

      if (!userExistIN) {
        throw new BadRequestError("user not exists");
      }
      if (Number(decodedToken.user.id) === userExistIN.id) {
        return res.status(400).json({ message: "Cannot transfer to yourself" });
      }

      const accountIdOUT = await new AccountController().ListAccount(
        decodedToken.user.account.id
      );
      const accountIdIN = await new AccountController().ListAccount(
        userExistIN.account.id
      );

      if (!accountIdOUT || !accountIdIN) {
        return res.status(400).json({ message: "Account not exists" });
      }

      if (accountIdOUT?.balance < value || value <= 0) {
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
        debitedAccount: accountIdOUT,
        creditedAccount: accountIdIN,
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

      const user = decodedToken.user;

      const { account: _, ...usernew } = user;

      const Transactionsout = await TransactionRepository.find(
        filter || order || desc
          ? {
              where: {
                debitedAccount: usernew,
              },
              relations: { creditedAccount: true },
              order: orderParams,
            }
          : {
              where: {
                debitedAccount: usernew,
              },
              relations: { creditedAccount: true },
            }
      );

      const Transactionsin = await TransactionRepository.find(
        filter || order || desc
          ? {
              where: {
                creditedAccount: usernew,
              },
              relations: { debitedAccount: true },
              order: orderParams,
            }
          : {
              where: {
                creditedAccount: usernew,
              },
              relations: { debitedAccount: true },
            }
      );

      if (filter) {
        if (filter === "cash-out") return res.status(200).json(Transactionsout);
        else if (filter === "cash-in")
          return res.status(200).json(Transactionsin);
      }

      const transacoes: any[] = [];
      Transactionsout?.map((e) => transacoes.push(e));
      Transactionsin?.map((e) => transacoes.push(e));

      console.log(decodedToken);
      console.log("out = " + Transactionsout);
      console.log("in = " + Transactionsin);

      res
        .status(200)
        .json(
          transacoes.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
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
