import { Request } from "express";
import PatientCreateDto from "../dto/PatientCreateDto";

export default interface IPatientRequest extends Request {
  body: PatientCreateDto;
}
