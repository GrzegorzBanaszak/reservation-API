import { RequestType } from "../enums/RequestType";
import IEndpoint from "../interfaces/IEndpoint";
import Endpoint from "./Endpoint";

export default class Controller {
  protected endpoints: Array<IEndpoint>;

  constructor() {
    this.endpoints = new Array<IEndpoint>();
  }

  addEndpoint(endpoint: any, requestType: RequestType): void {
    this.endpoints.push(new Endpoint(endpoint, requestType));
  }

  getEndpoints(): Array<IEndpoint> {
    return this.endpoints;
  }
}
