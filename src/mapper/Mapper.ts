import { createMap, createMapper } from "@automapper/core";
import { PojosMetadataMap, pojos } from "@automapper/pojos";
import { Patient } from "@prisma/client";
import PatientGetDto from "../dto/PatientGetDto";

export function createPatientMetadata() {
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

createPatientMetadata();
export const mapper = createMapper({
  strategyInitializer: pojos(),
});

createMap<Patient, PatientGetDto>(mapper, "Patient", "PatientDto");
