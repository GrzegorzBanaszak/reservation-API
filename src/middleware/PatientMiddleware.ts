import { NextFunction, Request, Response } from "express";
import CustomError from "../modules/CustomError";
import PatientCreateDto from "../dto/PatientCreateDto";
import Validator from "../modules/Validator";

export default class PatientMiddleware {
  validateData(req: Request, res: Response, next: NextFunction) {
    if (req.body instanceof PatientCreateDto) {
      const errorMassages = new Array<string>();

      let isError = false;

      if (!Validator.validationPesel(req.body.pesel)) {
        isError = true;
        errorMassages.push(
          "Nieporawny numer pesel. Pesel powinien zawierać 11 znaków"
        );
      }

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
      res.status(401);
      throw new CustomError("Nieprawidłowe dane");
    }
  }
}
