import { RequestType } from "../enums/RequestType";
import Endpoint from "../modules/Endpoint";
import Security from "../modules/Security";
import Controller from "./Controller";
import { Request, Response } from "express";

export default class AuthorizationController extends Controller {
  security: Security;
  constructor() {
    super();
    this.security = new Security();

    this.addEndpoint(new Endpoint("/login", this.login(), RequestType.Get));
  }
  // auth/login
  login(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const token = this.security.generateToken("123");
      res.status(200).json({ token });
    };
  }
}
