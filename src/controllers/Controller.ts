import { PrismaClient } from "@prisma/client";
import { PrismaLocalClient } from "../db/prisma";
import Endpoint from "./Endpoint";

export default class Controller {
  endpoints: Array<Endpoint>;
  client: PrismaClient;
  constructor() {
    this.client = PrismaLocalClient.getInstancion();
    this.endpoints = new Array<Endpoint>();
  }
  addEndpoint(endpoint: Endpoint): void {
    this.endpoints.push(endpoint);
  }
}
