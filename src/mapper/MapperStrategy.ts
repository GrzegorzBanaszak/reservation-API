import { Mapper } from "@automapper/core";
import { IStrategy } from "../interfaces/IStrategy";
import { PatientStrategy } from "./PatientStrategy";

export class MapperStrategy {
  mapperStrategy: Array<IStrategy> = new Array<IStrategy>();
  constructor() {
    this.mapperStrategy.push(new PatientStrategy());
  }
  createMetadata() {
    this.mapperStrategy.forEach((mapp) => {
      mapp.createMetadata();
    });
  }

  createMaps(mapper: Mapper) {
    this.mapperStrategy.forEach((mapp) => {
      mapp.createMaps(mapper);
    });
  }
}
