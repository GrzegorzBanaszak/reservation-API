import { PrismaClient } from "@prisma/client";
import { PrismaLocalClient } from "../db/prisma";
import Endpoint from "./Endpoint";
import ErrorHandler from "../middleware/ErrorHandler";

export default class Controller {
  endpoints: Array<Endpoint>;
  client: PrismaClient;
  errorHandler: ErrorHandler;
  constructor() {
    //Aby client działał poprawnie funkcje w pomniejszych kontrolerach muszą zwracać funkcje
    this.client = PrismaLocalClient.getInstancion();
    this.errorHandler = new ErrorHandler();
    this.endpoints = new Array<Endpoint>();
  }
  addEndpoint(endpoint: Endpoint): void {
    this.endpoints.push(endpoint);
  }
}
