import PatientCreateDto from "../../dto/PatientCreateDto";
import { RequestType } from "../../enums/RequestType";
import CustomError from "../../modules/CustomError";
import PatientValidation from "../../modules/PatientValidation";
import Controller from "../Controller";
import Endpoint from "../Endpoint";
import { Request, Response } from "express";

export default class PatientController extends Controller {
  constructor() {
    super();
    this.addEndpoint(new Endpoint("/", this.getAll(), RequestType.Get));
    this.addEndpoint(new Endpoint("/id/:id", this.getById(), RequestType.Get));
    this.addEndpoint(
      new Endpoint("/pesel/:pesel", this.getByPesel(), RequestType.Get)
    );
    this.addEndpoint(new Endpoint("/", this.createPatient(), RequestType.Post));
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
        throw new CustomError("Nie udało się znaleź pacienta");
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
        throw new CustomError("Nie udało się znaleź pacienta");
      }

      res.status(200).json(patient);
    };
  }

  createPatient(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { firstName, lastName, phoneNumber, pesel } = req.body;

      const errorMassages = new Array<string>();

      if (!firstName || !lastName || !phoneNumber || !pesel) {
        if (!firstName) {
          errorMassages.push("Podaj imię");
        }

        if (!lastName) {
          errorMassages.push("Podaj nazwisko");
        }

        if (!phoneNumber) {
          errorMassages.push("Podaj numer telefonu");
        }

        if (!pesel) {
          errorMassages.push("Podaj pesel");
        }

        res.status(400);
        throw new CustomError(errorMassages);
      }

      let isError = false;

      if (!PatientValidation.validationPesel(pesel)) {
        isError = true;
        errorMassages.push(
          "Nieporawny numer pesel. Pesel powinien zawierać 11 znaków"
        );
      }

      if (!PatientValidation.validationPhonNumber(phoneNumber)) {
        isError = true;
        errorMassages.push("Niepoprawny numer telefonu.");
      }

      if (isError) {
        res.status(400);
        throw new CustomError(errorMassages);
      }

      const createdPatient = await this.client.patient.create({
        data: new PatientCreateDto(firstName, lastName, phoneNumber, pesel),
      });

      res.status(200).json(createdPatient);
    };
  }
}
