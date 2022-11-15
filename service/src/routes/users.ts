import Router from "express";
import { LoginController } from "../controllers/LoginController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

routes.post("/", new LoginController().Login);

routes.post("/user", new UserController().CreateUser);
routes.get("/user", authMiddleware, new UserController().ListUser)
routes.put("/user/:user_id", authMiddleware, new UserController().UpdateUser)
routes.delete("/user/:user_id", authMiddleware, new UserController().DelUser);

export default routes;
