import { AppDataSource } from "../../data/data-source";
import { Transactions } from "../entities/Transaction";

export const TransactionRepository = AppDataSource.getRepository(Transactions);
