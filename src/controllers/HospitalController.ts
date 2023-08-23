import HospitalCreateDto from "../dto/HospitalCreateDto";
import { RequestType } from "../enums/RequestType";
import CustomError from "../modules/CustomError";
import Endpoint from "../modules/Endpoint";
import Controller from "./Controller";
import { Request, Response } from "express";

export default class HospitalController extends Controller {
  constructor() {
    super();
    this.addEndpoint(new Endpoint("/", this.getAll(), RequestType.Get));
    this.addEndpoint(new Endpoint("/:id", this.getById(), RequestType.Get));
    this.addEndpoint(
      new Endpoint("/", this.createHospital(), RequestType.Post)
    );
    this.addEndpoint(
      new Endpoint("/:id", this.updateHospital(), RequestType.Update)
    );
    this.addEndpoint(
      new Endpoint("/:id", this.deleteHospital(), RequestType.Delete)
    );
  }

  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const hospitals = await this.client.hospital.findMany();

      res.status(200).json(hospitals);
    };
  }

  getById(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const hospital = await this.client.hospital.findUnique({ where: { id } });

      if (!hospital) {
        res.status(400);
        throw new CustomError("Nie udało się znaleź szpitala");
      }

      res.status(200).json(hospital);
    };
  }

  createHospital(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { name, city, street, localNumber } = req.body;

      if (!name || !city || !street || !localNumber) {
        const errorMassages = new Array<string>();

        if (!name) {
          errorMassages.push("Podaj nazwe szpitala");
        }

        if (!city) {
          errorMassages.push("Podaj miasto");
        }

        if (!street) {
          errorMassages.push("Podaj ulicę");
        }

        if (!localNumber) {
          errorMassages.push("Podaj numer lokalu");
        }

        res.status(400);
        throw new CustomError(errorMassages);
      }

      const createdHospital = await this.client.hospital.create({
        data: new HospitalCreateDto(name, city, street, localNumber),
      });

      res.status(201).json(createdHospital);
    };
  }

  updateHospital(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, city, street, localNumber } = req.body;

      if (!name || !city || !street || !localNumber) {
        const errorMassages = new Array<string>();

        if (!name) {
          errorMassages.push("Podaj nazwe szpitala");
        }

        if (!city) {
          errorMassages.push("Podaj miasto");
        }

        if (!street) {
          errorMassages.push("Podaj ulicę");
        }

        if (!localNumber) {
          errorMassages.push("Podaj numer lokalu");
        }

        res.status(400);
        throw new CustomError(errorMassages);
      }

      const isHospitalExist = await this.client.hospital.findUnique({
        where: { id },
      });

      if (!isHospitalExist) {
        res.status(400);
        throw new CustomError("Szpital o podanym id nie istnieje");
      }

      const updateHospital = await this.client.hospital.update({
        where: { id },
        data: new HospitalCreateDto(name, city, street, localNumber),
      });

      res.status(201).json(updateHospital);
    };
  }

  deleteHospital(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const hospital = await this.client.hospital.findUnique({
        where: {
          id,
        },
      });

      if (!hospital) {
        res.status(400);
        throw new CustomError("Szpital o podanym id nie istnieje");
      }

      await this.client.hospital.delete({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "Udało się usunąć szpital" });
    };
  }
}
