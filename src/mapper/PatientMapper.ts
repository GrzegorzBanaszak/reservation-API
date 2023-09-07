import { Mapper, createMap } from "@automapper/core";
import { mapper } from "../mapper/Mapper";
import type { Patient } from "@prisma/client";
import PatientGetDto from "../dto/PatientGetDto";

export class PatientMapper {
  mapper: Mapper = mapper;

  mapGet(data: Patient): PatientGetDto {
    const dto = this.mapper.map<Patient, PatientGetDto>(
      data,
      "Patient",
      "PatientDto"
    );

    return dto;
  }
}
