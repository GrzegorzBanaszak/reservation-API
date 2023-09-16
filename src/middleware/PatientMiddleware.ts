import { NextFunction, Request, Response } from "express";
import CustomError from "../modules/CustomError";
import PatientCreateDto from "../dto/PatientCreateDto";
import Validator from "../modules/Validator";
import jwt, { JwtPayload } from "jsonwebtoken";

export default class PatientMiddleware {
  validateData(req: Request, res: Response, next: NextFunction) {
    if (PatientCreateDto.isValid(req.body)) {
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
      const errorMassages = PatientCreateDto.checkMissingData(req.body);

      res.status(400);
      throw new CustomError(errorMassages);
    }
  }

  validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        next();
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          res.status(401);
          res.clearCookie("token");
          throw new Error("Token wygasł");
        }
        res.status(401);
        throw new Error("Brak uprawnień");
      }
    } else {
      res.status(401);
      throw new CustomError("Brak tokenu");
    }
  }
}
