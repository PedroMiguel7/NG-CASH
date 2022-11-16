import { Accounts } from "../entities/Account";
import { AppDataSource } from "../../data/data-source";

export const AccountRepository = AppDataSource.getRepository(Accounts);
