import { Mapper, createMap } from "@automapper/core";
import { IStrategy } from "../interfaces/IStrategy";
import { MapperStrategy } from "./MapperStrategy";
import { PojosMetadataMap } from "@automapper/pojos";
import type { Doctor } from "@prisma/client";
import DoctorGetDto from "../dto/DoctorGetDto";

export class DoctorStrategy implements MapperStrategy {
  mapperStrategy: IStrategy[];
  createMetadata(): void {
    PojosMetadataMap.create<Doctor>("Doctor", {
      id: String,
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      specialization: String,
      phoneNumber: String,
    });
    PojosMetadataMap.create<DoctorGetDto>("DoctorDto", {
      id: String,
      email: String,
      firstName: String,
      lastName: String,
      specialization: String,
      phoneNumber: String,
    });
  }
  createMaps(mapper: Mapper): void {
    createMap<Doctor, DoctorGetDto>(mapper, "Doctor", "DoctorDto");
  }
}
