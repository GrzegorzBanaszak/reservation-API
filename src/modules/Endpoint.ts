import { RequestType } from "../enums/RequestType";
import { Request, Response } from "express";

export default class Endpoint {
  path: string;
  callback: (req: Request, res: Response) => Promise<void>;
  typeRequest: RequestType;

  constructor(
    path: string,
    callback: (req: Request, res: Response) => Promise<void>,
    requestType: RequestType
  ) {
    this.path = path;
    this.callback = callback;
    this.typeRequest = requestType;
  }
}
