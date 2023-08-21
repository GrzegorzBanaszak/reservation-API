import { RequestType } from "../enums/RequestType";
import Endpoint from "../modules/Endpoint";
import Controller from "./Controller";
import { Request, Response } from "express";

export default class DoctorController extends Controller {
  constructor() {
    super();
    this.addEndpoint(new Endpoint("/", this.getAll(), RequestType.Get));
  }
  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const doctors = await this.client.doctor.findMany();

      res.status(200).json(doctors);
    };
  }
}
