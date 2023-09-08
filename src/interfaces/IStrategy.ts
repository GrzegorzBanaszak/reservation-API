import { Mapper } from "@automapper/core";

export interface IStrategy {
  createMetadata(): void;
  createMaps(mapper: Mapper): void;
}
