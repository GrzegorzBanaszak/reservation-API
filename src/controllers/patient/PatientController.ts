import { RequestType } from "../../enums/RequestType";
import Controller from "../Controller";
import Endpoint from "../Endpoint";
import { Request, Response } from "express";

export default class PatientController extends Controller {
  constructor() {
    super();
    this.addEndpoint(new Endpoint("/", this.getAll(), RequestType.Get));
    this.addEndpoint(new Endpoint("/:id", this.getById(), RequestType.Get));
    this.addEndpoint(
      new Endpoint("/:pesel", this.getByPesel(), RequestType.Get)
    );
  }

  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const patients = await this.client.patient.findMany();

      res.status(200).json(patients);
    };
  }

  getById(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const patient = await this.client.patient.findUnique({
        where: {
          id,
        },
      });

      if (!patient) {
        res.status(400);
        throw new Error("Nie udało się znaleź pacienta");
      }

      res.status(200).json(patient);
    };
  }

  getByPesel(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { pesel } = req.params;
      const patient = await this.client.patient.findUnique({
        where: {
          pesel: pesel,
        },
      });

      if (!patient) {
        res.status(400);
        throw new Error("Nie udało się znaleź pacienta");
      }

      res.status(200).json(patient);
    };
  }
}
