import { RequestType } from "../enums/RequestType";
import { Request, Response } from "express";

export default class Endpoint<T = unknown> {
  path: string;
  callback: (req: Request, res: Response) => Promise<T>;
  typeRequest: RequestType;

  constructor(
    callback: (req: Request, res: Response) => Promise<T>,
    requestType: RequestType,
    params?: Array<string>
  ) {
    this.path = `/${callback.name}`;
    this.callback = callback;
    this.typeRequest = requestType;
    if (params) {
      this.path = this.getPath(params);
    }
  }
  getPath(params: Array<string>): string {
    let path = `/${this.path}`;
    params.forEach((p) => {
      path += `/:${p}`;
    });

    return path;
  }
}
