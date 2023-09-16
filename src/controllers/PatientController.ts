import { RequestType } from "../enums/RequestType";
import CustomError from "../modules/CustomError";
import Controller from "./Controller";
import Endpoint from "../modules/Endpoint";
import { Request, Response } from "express";
import IPatientRequest from "../interfaces/IPatientRequest";
import { Security } from "../middleware/Security";
import { PatientMapper } from "../mapper/PatientMapper";
import { PrismaLocalClient } from "../db/prisma";
import { Injectable } from "../injection/injector";
import PatientMiddleware from "../middleware/PatientMiddleware";

@Injectable()
export default class PatientController extends Controller {
  constructor(
    public client: PrismaLocalClient,
    public mapper: PatientMapper,
    public security: Security
  ) {
    super();
  }

  override routesInit(): void {
    const patientMiddle = new PatientMiddleware();
    this.addEndpoint(
      new Endpoint("/", this.getAll(), RequestType.Get, [
        patientMiddle.validateToken,
      ])
    );
    this.addEndpoint(new Endpoint("/id/:id", this.getById(), RequestType.Get));
    this.addEndpoint(
      new Endpoint("/pesel/:pesel", this.getByPesel(), RequestType.Get)
    );
    this.addEndpoint(
      new Endpoint("/", this.registerPatient(), RequestType.Post, [
        patientMiddle.validateData,
      ])
    );
    this.addEndpoint(
      new Endpoint("/:id", this.updatePatinet(), RequestType.Update, [
        patientMiddle.validateData,
      ])
    );
    this.addEndpoint(
      new Endpoint("/:id", this.deletePatient(), RequestType.Delete)
    );
  }

  // GET /api/patient
  // Protection - only user with token
  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const patients = await this.client.patient.findMany();
      const dto = this.mapper.mapGetArray(patients);
      res.status(200).json(dto);
    };
  }

  // GET /api/patient/:id
  // Protection - only user with token
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
        throw new CustomError("Nie udało się znaleź pacienta");
      }

      const dto = this.mapper.mapGet(patient);

      res.status(200).json(dto);
    };
  }

  // GET /api/patient/:pesel
  // Protection - only user with token
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
        throw new CustomError("Nie udało się znaleź pacienta");
      }

      const dto = this.mapper.mapGet(patient);
      res.status(200).json(dto);
    };
  }

  // POST /api/patient/
  // Validation - Is patient data has every required filds
  registerPatient(): (req: IPatientRequest, res: Response) => Promise<void> {
    return async (req: IPatientRequest, res: Response) => {
      const hashPassword = await this.security.hashPassword(req.body.password);

      const createdPatient = await this.client.patient.create({
        data: {
          ...req.body,
          password: hashPassword,
        },
      });

      const token = this.security.generateToken(createdPatient.id);
      res.cookie("token", token, this.security.getCookisConfig());

      const dto = this.mapper.mapGet(createdPatient);

      res.status(201).json(dto);
    };
  }
  // PUT /api/patient/
  // Validation - Is patient data has every required filds
  // Protection - only user with token
  updatePatinet(): (req: IPatientRequest, res: Response) => Promise<void> {
    return async (req: IPatientRequest, res: Response) => {
      const updatedPatient = await this.client.patient.update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      });
      const dto = this.mapper.mapGet(updatedPatient);
      res.status(201).json(dto);
    };
  }

  // DELETE /api/patient/
  // Protection - only user with token
  deletePatient(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const patient = await this.client.patient.findUnique({
        where: {
          id,
        },
      });

      if (!patient) {
        res.status(400);
        throw new CustomError("Pacient o podanym id nie istnieje");
      }

      await this.client.patient.delete({
        where: {
          id,
        },
      });

      res.status(200).json({ message: "Udało się usunąć pacienta" });
    };
  }
}
