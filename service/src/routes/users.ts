import Router from "express";
import { LoginController } from "../controllers/LoginController";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routesuser = Router();

routesuser.post("/login", new LoginController().Login);

routesuser.post("/user", new UserController().CreateUser);
routesuser.get("/user/account", authMiddleware, new UserController().ListUserForIdAccount);
routesuser.get("/user", authMiddleware, new UserController().ListUserAccount);
routesuser.put("/user", authMiddleware, new UserController().UpdateUser);
routesuser.delete("/user", authMiddleware, new UserController().DelUser);

export default routesuser;
