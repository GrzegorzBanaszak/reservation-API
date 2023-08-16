import { RequestType } from "../../enums/RequestType";
import Controller from "../Controller";
import Endpoint from "../Endpoint";
import { Request, Response } from "express";

export default class PatientController extends Controller {
  constructor() {
    super();
    this.addEndpoint(new Endpoint<any>("", this.getAll(), RequestType.Get));
  }

  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const companies = await this.client.patient.findMany();

      res.status(200).json(companies);
    };
  }

  async getPatienrById(req: Request, res: Response): Promise<void> {}
}
