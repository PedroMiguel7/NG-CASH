import Router from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AccountController } from "../controllers/AccountController";

const routes = Router();

routes.get("/account/:id", authMiddleware, new AccountController().ListAccount);
routes.put("/account/:id", authMiddleware, new AccountController().ListAccount);
routes.delete("/account/:id", authMiddleware, new AccountController().ListAccount);

export default routes;
