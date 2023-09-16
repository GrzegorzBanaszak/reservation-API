import { NextFunction, Request, Response } from "express";
import LoginUserDto from "../dto/LoginUserDto";
import CustomError from "../modules/CustomError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRequest } from "../interfaces/UserRequest";

export class UserMiddleware {
  validateLogin(req: Request, res: Response, next: NextFunction) {
    if (req.body instanceof LoginUserDto) {
      next();
    } else {
      res.status(401);
      throw new CustomError("Nieprawidłowe dane");
    }
  }

  validateToken(req: UserRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        req.id = decode.id;
        next();
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          res.status(401);
          res.clearCookie("token");
          throw new Error("Token wygasł");
        }
        res.status(401);
        throw new Error("Brak uprawnień");
      }
    } else {
      res.status(401);
      throw new CustomError("Brak tokenu");
    }
  }
}
