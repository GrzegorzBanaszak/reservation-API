import { RequestType } from "../enums/RequestType";
import Endpoint from "../modules/Endpoint";
import { Security } from "../middleware/Security";
import Controller from "./Controller";
import { Request, Response } from "express";
import { UserMiddleware } from "../middleware/UserMiddleware";
import { UserRequest } from "../interfaces/UserRequest";

export default class AuthorizationController extends Controller {
  constructor(public security: Security) {
    super();
    const userMiddleware = new UserMiddleware();
    this.addEndpoint(
      new Endpoint("/login", this.login(), RequestType.Post, [
        userMiddleware.validateLogin,
      ])
    );

    this.addEndpoint(
      new Endpoint("/me", this.getUser(), RequestType.Get, [
        userMiddleware.validateToken,
      ])
    );
  }
  // auth/login
  login(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const token = this.security.generateToken("123");
      res.status(200).json({ token });
    };
  }

  getUser(): (req: UserRequest, res: Response) => Promise<void> {
    return async (req: UserRequest, res: Response) => {
      res.status(200).json({ id: req.id });
    };
  }
}
