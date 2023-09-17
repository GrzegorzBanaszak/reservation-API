import { Request } from "express";
import DoctorCreateDto from "../dto/DoctorCreateDto";
export interface IDoctorRequest extends Request {
  body: DoctorCreateDto;
}
