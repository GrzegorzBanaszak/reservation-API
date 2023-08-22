import { RequestType } from "../enums/RequestType";
import Endpoint from "../modules/Endpoint";
import Controller from "./Controller";
import { Request, Response } from "express";

export default class HospitalController extends Controller {
  constructor() {
    super();
    this.addEndpoint(new Endpoint("/", this.getAll(), RequestType.Get));
  }

  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const hospitals = await this.client.hospital.findMany();

      res.status(200).json(hospitals);
    };
  }
}
