import type { Doctor } from "@prisma/client";
import { IMapper } from "../interfaces/IMapper";
import { mapper } from "./Mapper";
import DoctorGetDto from "../dto/DoctorGetDto";
import { Mapper } from "@automapper/core";
import { Injectable } from "../injection/injector";

@Injectable()
export class DoctorMapper implements IMapper<Doctor, DoctorGetDto> {
  mapper: Mapper = mapper;
  constructor() {}
  mapGet(data: Doctor): DoctorGetDto {
    const dto = this.mapper.map<Doctor, DoctorGetDto>(
      data,
      "Doctor",
      "DoctorDto"
    );

    return dto;
  }
  mapGetArray(data: Array<Doctor>): Array<DoctorGetDto> {
    const dto = this.mapper.mapArray<Doctor, DoctorGetDto>(
      data,
      "Doctor",
      "DoctorDto"
    );

    return dto;
  }
}
