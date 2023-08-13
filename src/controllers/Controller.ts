import Endpoint from "./Endpoint";

export default class Controller {
  endpoints: Array<Endpoint<unknown>>;

  constructor() {
    this.endpoints = new Array<Endpoint<unknown>>();
  }
  addEndpoint(endpoint: Endpoint<unknown>): void {
    this.endpoints.push(endpoint);
  }
}
