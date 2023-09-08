import { createMapper } from "@automapper/core";
import { pojos } from "@automapper/pojos";

import { MapperStrategy } from "./MapperStrategy";

const mapperStrategy = new MapperStrategy();

mapperStrategy.createMetadata();
export const mapper = createMapper({
  strategyInitializer: pojos(),
});

mapperStrategy.createMaps(mapper);
