import Router from "express";
import { LoginController } from "../controllers/LoginController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routesuser = Router();

routesuser.post("/", new LoginController().Login);

routesuser.post("/user", new UserController().CreateUser);
routesuser.get("/user/:user_id", authMiddleware, new UserController().ListUser)
routesuser.put("/user/:user_id", authMiddleware, new UserController().UpdateUser)
routesuser.delete("/user/:user_id", authMiddleware, new UserController().DelUser);

export default routesuser;
