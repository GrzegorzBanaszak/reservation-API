import { Mapper, createMap } from "@automapper/core";
import type { Patient } from "@prisma/client";
import PatientGetDto from "../dto/PatientGetDto";
import { mapper } from "./Mapper";
import { Injectable } from "../injection/injector";
import { IMapper } from "../interfaces/IMapper";

@Injectable()
export class PatientMapper implements IMapper<Patient, PatientGetDto> {
  mapper: Mapper = mapper;
  constructor() {}
  mapGet(data: Patient): PatientGetDto {
    const dto = this.mapper.map<Patient, PatientGetDto>(
      data,
      "Patient",
      "PatientDto"
    );

    return dto;
  }

  mapGetArray(data: Array<Patient>): Array<PatientGetDto> {
    const dtos = this.mapper.mapArray<Patient, PatientGetDto>(
      data,
      "Patient",
      "PatientDto"
    );

    return dtos;
  }
}
