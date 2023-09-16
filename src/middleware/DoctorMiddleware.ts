import { NextFunction, Request, Response } from "express";
import DoctorCreateDto from "../dto/DoctorCreateDto";
import Validator from "../modules/Validator";
import CustomError from "../modules/CustomError";

export class DoctorMiddleware {
  validateData(req: Request, res: Response, next: NextFunction) {
    if (DoctorCreateDto.isValid(req.body)) {
      const errorMassages = new Array<string>();

      let isError = false;

      if (!Validator.validationPhonNumber(req.body.phoneNumber)) {
        isError = true;
        errorMassages.push("Niepoprawny numer telefonu.");
      }

      if (isError) {
        res.status(400);
        throw new CustomError(errorMassages);
      }

      next();
    } else {
      const errorMassages = DoctorCreateDto.checkMissingData(req.body);

      res.status(400);
      throw new CustomError(errorMassages);
    }
  }
}
