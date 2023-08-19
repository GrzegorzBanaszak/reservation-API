import { NextFunction, Request, Response } from "express";
import CustomError from "../modules/CustomError";
export default class ErrorHandler {
  constructor() {}

  handler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    if (Array.isArray(err.message)) {
      res.json({ message: err.message });
    } else {
      res.json({ message: [err.message] });
    }
  }
}
