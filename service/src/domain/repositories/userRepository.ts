import { AppDataSource } from "../../data/data-source";
import { Users } from "../entities/User";

export const userRepository = AppDataSource.getRepository(Users);
