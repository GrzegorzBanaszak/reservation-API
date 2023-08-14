import { RequestType } from "../../enums/RequestType";
import Controller from "../Controller";
import Endpoint from "../Endpoint";
import { Request, Response } from "express";

export default class PatientController extends Controller {
  constructor() {
    super();
    this.addEndpoint(new Endpoint<any>(this.getAll, RequestType.Get));
  }

  async getAll(req: Request, res: Response): Promise<void> {
    res.json({ name: "test" });
  }
}
