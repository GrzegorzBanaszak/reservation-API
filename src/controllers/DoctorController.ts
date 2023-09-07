import DoctorCreateDto from "../dto/DoctorCreateDto";
import { RequestType } from "../enums/RequestType";
import CustomError from "../modules/CustomError";
import Endpoint from "../modules/Endpoint";
import Validator from "../modules/Validator";
import Controller from "./Controller";
import { Request, Response } from "express";

export default class DoctorController extends Controller {
  constructor() {
    super();
    this.addEndpoint(new Endpoint("/", this.getAll(), RequestType.Get));
    this.addEndpoint(new Endpoint("/id/:id", this.getById(), RequestType.Get));
    this.addEndpoint(new Endpoint("/", this.createDoctor(), RequestType.Post));
    this.addEndpoint(
      new Endpoint("/:id", this.updateDoctor(), RequestType.Update)
    );
    this.addEndpoint(
      new Endpoint("/:id", this.deleteDoctor(), RequestType.Delete)
    );
  }
  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const doctors = await this.client.doctor.findMany();

      res.status(200).json(doctors);
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

      res.status(200).json(doctor);
    };
  }
  // TODO: Zmienić dodawanie lekarza na rejestracje z email i hasłem
  createDoctor(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      // const { firstName, lastName, specialization, phoneNumber } = req.body;
      // const errorMassages = new Array<string>();
      // if (!firstName || !lastName || !specialization || !phoneNumber) {
      //   if (!firstName) {
      //     errorMassages.push("Podaj imię");
      //   }
      //   if (!lastName) {
      //     errorMassages.push("Podaj nazwisko");
      //   }
      //   if (!phoneNumber) {
      //     errorMassages.push("Podaj numer telefonu");
      //   }
      //   if (!specialization) {
      //     errorMassages.push("Podaj specializacje");
      //   }
      //   res.status(400);
      //   throw new CustomError(errorMassages);
      // }
      // let isError = false;
      // if (!Validator.validationPhonNumber(phoneNumber)) {
      //   isError = true;
      //   errorMassages.push("Niepoprawny numer telefonu.");
      // }
      // if (isError) {
      //   res.status(400);
      //   throw new CustomError(errorMassages);
      // }
      // const createdDoctor = await this.client.doctor.create({
      //   data: new DoctorCreateDto(
      //     firstName,
      //     lastName,
      //     specialization,
      //     phoneNumber
      //   ),
      // });
      // res.status(201).json(createdDoctor);
    };
  }

  updateDoctor(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { firstName, lastName, specialization, phoneNumber } = req.body;

      const errorMassages = new Array<string>();

      if (!firstName || !lastName || !phoneNumber || !specialization) {
        if (!firstName) {
          errorMassages.push("Podaj imię");
        }

        if (!lastName) {
          errorMassages.push("Podaj nazwisko");
        }

        if (!phoneNumber) {
          errorMassages.push("Podaj numer telefonu");
        }

        if (!specialization) {
          errorMassages.push("Podaj specializacje");
        }

        res.status(400);
        throw new CustomError(errorMassages);
      }

      let isError = false;

      if (!Validator.validationPhonNumber(phoneNumber)) {
        isError = true;
        errorMassages.push("Niepoprawny numer telefonu.");
      }

      if (isError) {
        res.status(400);
        throw new CustomError(errorMassages);
      }

      const updatedDoctor = await this.client.doctor.update({
        where: {
          id: req.params.id,
        },
        data: new DoctorCreateDto(
          firstName,
          lastName,
          specialization,
          phoneNumber
        ),
      });

      res.status(201).json(updatedDoctor);
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
