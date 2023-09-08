import { Mapper, createMap } from "@automapper/core";
import { IStrategy } from "../interfaces/IStrategy";
import { PojosMetadataMap } from "@automapper/pojos";
import type { Patient } from "@prisma/client";
import PatientGetDto from "../dto/PatientGetDto";

export class PatientStrategy implements IStrategy {
  createMetadata(): void {
    PojosMetadataMap.create<Patient>("Patient", {
      id: String,
      email: String,
      password: String,
      firstName: String,
      lastName: String,
      phoneNumber: String,
      pesel: String,
    });
    PojosMetadataMap.create<PatientGetDto>("PatientDto", {
      id: String,
      email: String,
      firstName: String,
      lastName: String,
      phoneNumber: String,
      pesel: String,
    });
  }
  createMaps(mapper: Mapper): void {
    createMap<Patient, PatientGetDto>(mapper, "Patient", "PatientDto");
  }
}
