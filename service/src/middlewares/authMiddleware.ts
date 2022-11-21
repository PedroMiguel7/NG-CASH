import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../domain/repositories/userRepository";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { id } = jwt.verify(authorization, process.env.JWT_PASS ?? "") as any;
    const user2 = await userRepository.findOneBy({ id });
    next();
  }
};
