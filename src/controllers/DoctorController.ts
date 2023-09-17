import { PrismaLocalClient } from "../db/prisma";
import { RequestType } from "../enums/RequestType";
import { Injectable } from "../injection/injector";
import { IDoctorRequest } from "../interfaces/IDoctorRequest";
import { DoctorMapper } from "../mapper/DoctorMapper";
import { DoctorMiddleware } from "../middleware/DoctorMiddleware";
import { Security } from "../middleware/Security";
import CustomError from "../modules/CustomError";
import Endpoint from "../modules/Endpoint";
import Controller from "./Controller";
import { Request, Response } from "express";

@Injectable()
export default class DoctorController extends Controller {
  constructor(
    public client: PrismaLocalClient,
    public mapper: DoctorMapper,
    public security: Security
  ) {
    super();
  }

  override routesInit(): void {
    const middleware = new DoctorMiddleware();

    //GET
    // api/doctors/
    this.addEndpoint(new Endpoint("/", this.getAll(), RequestType.Get));

    //GET
    // api/doctors/id/:id
    this.addEndpoint(new Endpoint("/id/:id", this.getById(), RequestType.Get));

    //POST
    // api/doctor/
    this.addEndpoint(
      new Endpoint("/", this.createDoctor(), RequestType.Post, [
        middleware.validateData,
      ])
    );

    //PUT
    // api/doctor/
    this.addEndpoint(
      new Endpoint("/:id", this.updateDoctor(), RequestType.Update, [
        middleware.validateData,
      ])
    );

    //DELETE
    // api/doctor/:id
    this.addEndpoint(
      new Endpoint("/:id", this.deleteDoctor(), RequestType.Delete)
    );
  }

  // GET /api/doctor
  // Protection - only user with token
  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const doctors = await this.client.doctor.findMany();

      const dtos = this.mapper.mapGetArray(doctors);

      res.status(200).json(dtos);
    };
  }

  getById(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const doctor = await this.client.doctor.findUnique({
        where: {
          id,
        },
      });

      if (!doctor) {
        res.status(400);
        throw new CustomError("Nie udało się znaleź lekarza");
      }

      const dto = this.mapper.mapGet(doctor);

      res.status(200).json(dto);
    };
  }
  // TODO: Zmienić dodawanie lekarza na rejestracje z email i hasłem
  createDoctor(): (req: IDoctorRequest, res: Response) => Promise<void> {
    return async (req: IDoctorRequest, res: Response) => {
      const createdDoctor = await this.client.doctor.create({
        data: req.body,
      });

      if (!createdDoctor) {
        res.status(401);
        throw new CustomError("Nie udało sie utworzyć nowego lekarza");
      }

      const token = this.security.generateToken(createdDoctor.id);

      res.cookie(
        this.security.TOKEN_NAME,
        token,
        this.security.getCookisConfig()
      );

      const dto = this.mapper.mapGet(createdDoctor);
      res.status(201).json(dto);
    };
  }

  updateDoctor(): (req: IDoctorRequest, res: Response) => Promise<void> {
    return async (req: IDoctorRequest, res: Response) => {
      const updatedDoctor = await this.client.doctor.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });

      if (!updatedDoctor) {
        res.status(401);
        throw new CustomError("Nie udało sie zaktualizować lekarza");
      }

      const dto = this.mapper.mapGet(updatedDoctor);

      res.status(201).json(dto);
    };
  }

  deleteDoctor(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const doctor = await this.client.doctor.findUnique({
        where: {
          id,
        },
      });

      if (!doctor) {
        res.status(400);
        throw new CustomError("Doktor o podanym id nie istnieje");
      }

      await this.client.doctor.delete({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "Udało się usunąć doktora" });
    };
  }
}
