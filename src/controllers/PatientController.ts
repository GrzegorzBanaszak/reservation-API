import PatientCreateDto from "../dto/PatientCreateDto";
import { RequestType } from "../enums/RequestType";
import CustomError from "../modules/CustomError";
import Validator from "../modules/Validator";
import Controller from "./Controller";
import Endpoint from "../modules/Endpoint";
import { Request, Response } from "express";
import IPatientRequest from "../interfaces/IPatientRequest";
import Security from "../middleware/Security";
import { PatientMapper } from "../mapper/PatientMapper";
import { PrismaLocalClient } from "../db/prisma";
import { Injectable } from "../injection/injector";

@Injectable()
export default class PatientController extends Controller {
  security = new Security();
  constructor(public client: PrismaLocalClient, public mapper: PatientMapper) {
    super();
    this.addEndpoint(new Endpoint("/", this.getAll(), RequestType.Get));
    // this.addEndpoint(new Endpoint("/id/:id", this.getById(), RequestType.Get));
    // this.addEndpoint(
    //   new Endpoint("/pesel/:pesel", this.getByPesel(), RequestType.Get)
    // );
    // this.addEndpoint(
    //   new Endpoint("/", this.registerPatient(), RequestType.Post)
    // );
    // this.addEndpoint(
    //   new Endpoint("/:id", this.updatePatinet(), RequestType.Update)
    // );
    // this.addEndpoint(
    //   new Endpoint("/:id", this.deletePatient(), RequestType.Delete)
    // );
  }

  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const patients = await this.client.patient.findMany();
      const dto = this.mapper.mapGetArray(patients);
      res.status(200).json(dto);
    };
  }

  // getById(): (req: Request, res: Response) => Promise<void> {
  //   return async (req: Request, res: Response) => {
  //     const { id } = req.params;
  //     const patient = await this.client.patient.findUnique({
  //       where: {
  //         id,
  //       },
  //     });

  //     if (!patient) {
  //       res.status(400);
  //       throw new CustomError("Nie udało się znaleź pacienta");
  //     }

  //     res.status(200).json(patient);
  //   };
  // }

  // getByPesel(): (req: Request, res: Response) => Promise<void> {
  //   return async (req: Request, res: Response) => {
  //     const { pesel } = req.params;
  //     const patient = await this.client.patient.findUnique({
  //       where: {
  //         pesel: pesel,
  //       },
  //     });

  //     if (!patient) {
  //       res.status(400);
  //       throw new CustomError("Nie udało się znaleź pacienta");
  //     }

  //     res.status(200).json(patient);
  //   };
  // }
  // TODO: Zmienić dodawanie pacjęta na rejestracje z email i hasłem
  // registerPatient(): (req: IPatientRequest, res: Response) => Promise<void> {
  //   return async (req: IPatientRequest, res: Response) => {
  //     const hashPassword = await this.security.hashPassword(req.body.password);

  //     const createdPatient = await this.client.patient.create({
  //       data: {
  //         ...req.body,
  //         password: hashPassword,
  //       },
  //     });

  //     const token = this.security.generateToken(createdPatient.id);
  //     res.cookie("token", token, this.security.getCookisConfig());

  //     const dto = this.mapper.mapGet(createdPatient);

  //     res.status(201).json(dto);
  //   };
  // }

  // updatePatinet(): (req: Request, res: Response) => Promise<void> {
  //   return async (req: Request, res: Response) => {
  //     const { firstName, lastName, phoneNumber, pesel } = req.body;

  //     const errorMassages = new Array<string>();

  //     if (!firstName || !lastName || !phoneNumber || !pesel) {
  //       if (!firstName) {
  //         errorMassages.push("Podaj imię");
  //       }

  //       if (!lastName) {
  //         errorMassages.push("Podaj nazwisko");
  //       }

  //       if (!phoneNumber) {
  //         errorMassages.push("Podaj numer telefonu");
  //       }

  //       if (!pesel) {
  //         errorMassages.push("Podaj pesel");
  //       }

  //       res.status(400);
  //       throw new CustomError(errorMassages);
  //     }

  //     let isError = false;

  //     if (!Validator.validationPesel(pesel)) {
  //       isError = true;
  //       errorMassages.push(
  //         "Nieporawny numer pesel. Pesel powinien zawierać 11 znaków"
  //       );
  //     }

  //     if (!Validator.validationPhonNumber(phoneNumber)) {
  //       isError = true;
  //       errorMassages.push("Niepoprawny numer telefonu.");
  //     }

  //     if (isError) {
  //       res.status(400);
  //       throw new CustomError(errorMassages);
  //     }

  //     const updatedPatient = await this.client.patient.update({
  //       where: {
  //         id: req.params.id,
  //       },
  //       data: new PatientCreateDto(firstName, lastName, phoneNumber, pesel),
  //     });

  //     res.status(201).json(updatedPatient);
  //   };
  // }

  // deletePatient(): (req: Request, res: Response) => Promise<void> {
  //   return async (req: Request, res: Response) => {
  //     const { id } = req.params;
  //     const patient = await this.client.patient.findUnique({
  //       where: {
  //         id,
  //       },
  //     });

  //     if (!patient) {
  //       res.status(400);
  //       throw new CustomError("Pacient o podanym id nie istnieje");
  //     }

  //     await this.client.patient.delete({
  //       where: {
  //         id,
  //       },
  //     });

  //     res.status(200).json({ message: "Udało się usunąć pacienta" });
  //   };
  // }
}
