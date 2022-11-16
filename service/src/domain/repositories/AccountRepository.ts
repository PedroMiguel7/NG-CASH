import { Accounts } from "../entities/Account";
import { AppDataSource } from "../../data-source";

export const AccountRepository = AppDataSource.getRepository(Accounts);
