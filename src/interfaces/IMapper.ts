import { Mapper } from "@automapper/core";

export interface IMapper<TI, TU> {
  mapper: Mapper;
  mapGet(data: TI): TU;
  mapGetArray(data: Array<TI>): Array<TU>;
}
