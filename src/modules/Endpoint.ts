import { RequestType } from "../enums/RequestType";
import { NextFunction, Request, Response } from "express";

export default class Endpoint {
  path: string;
  callback: (req: Request, res: Response) => Promise<void>;
  typeRequest: RequestType;
  middleware: Array<(req: Request, res: Response, next: NextFunction) => void>;

  constructor(
    path: string,
    callback: (req: Request, res: Response) => Promise<void>,
    requestType: RequestType,
    middleware?: Array<
      (req: Request, res: Response, next: NextFunction) => void
    >
  ) {
    this.path = path;
    this.callback = callback;
    this.typeRequest = requestType;
    if (middleware) {
      this.middleware = middleware;
    }
  }
}
