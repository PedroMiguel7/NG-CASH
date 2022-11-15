import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError("Not authorization");
  }
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as any;
  const user2 = await userRepository.findOneBy({ id });
  if (!user2) {
    throw new UnauthorizedError("Not authorization");
  }
  next();
};
