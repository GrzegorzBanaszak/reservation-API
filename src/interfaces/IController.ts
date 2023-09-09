import Endpoint from "../modules/Endpoint";

export interface IController {
  addEndpoint(endpoint: Endpoint): void;
}
