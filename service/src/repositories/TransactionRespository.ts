import { AppDataSource } from "../data-source";
import { Transactions } from "../entities/Transaction";

export const TransactionRepository = AppDataSource.getRepository(Transactions);
