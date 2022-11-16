import Router from "express";
import { TransactionController } from "../controllers/TransactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routestransaction = Router();

routestransaction.post("/transaction/:user_id", authMiddleware, new TransactionController().CreateTransaction);
routestransaction.get("/transaction/:id", authMiddleware, new TransactionController().ListTransaction);
routestransaction.put("/transaction/:id", authMiddleware, new TransactionController().UpdateTransaction)
routestransaction.delete("/transaction/:id", authMiddleware, new TransactionController().DelTransaction);

export default routestransaction;
