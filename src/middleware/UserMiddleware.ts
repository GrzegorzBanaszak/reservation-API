import { NextFunction, Request, Response } from "express";
import LoginUserDto from "../dto/LoginUserDto";
import CustomError from "../modules/CustomError";

export default class UserMiddleware {
  validateLogin(req: Request, res: Response, next: NextFunction) {
    if (req.body instanceof LoginUserDto) {
      next();
    } else {
      res.status(401);
      throw new CustomError("Nieprawidłowe dane");
    }
  }
}
