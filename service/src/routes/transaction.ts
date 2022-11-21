import Router from "express";
import { TransactionController } from "../controllers/TransactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routestransaction = Router();

routestransaction.post("/transaction", authMiddleware, new TransactionController().CreateTransaction);
routestransaction.get("/transaction", authMiddleware, new TransactionController().ListTransaction);
routestransaction.delete("/transaction/:id", authMiddleware, new TransactionController().DelTransaction);

export default routestransaction;
