import Router from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AccountController } from "../controllers/AccountController";

const routesaccount = Router();

routesaccount.get("/account/:id", authMiddleware, new AccountController().ListAccount);
routesaccount.delete("/account/:id", authMiddleware, new AccountController().ListAccount);

export default routesaccount;
