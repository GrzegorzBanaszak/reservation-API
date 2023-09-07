import { NextFunction, Request, Response } from "express";
import CustomError from "../modules/CustomError";
import { Prisma } from "@prisma/client";
export default class ErrorHandler {
  constructor() {}

  handler(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode ? res.statusCode : 500;
    if (err instanceof Prisma.PrismaClientInitializationError) {
      res.status(500);
      res.json({ message: "Problem z bazą danych" });
    } else if (err instanceof CustomError) {
      res.status(statusCode);

      if (Array.isArray(err.message)) {
        res.json({ message: err.message });
      } else {
        res.json({ message: [err.message] });
      }
    } else {
      res.status(400);
      res.json({ message: "Wystąpił bład" });
    }
  }
}
