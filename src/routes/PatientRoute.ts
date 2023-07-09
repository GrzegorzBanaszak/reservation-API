import Controller from "../controllers/Controller";
import patientController from "../controllers/patient";
import { RequestType } from "../enums/RequestType";
import IEndpoint from "../interfaces/IEndpoint";
import IRoute from "../interfaces/IRoute";
import { Router } from "express";
export default class PatientRoute implements IRoute {
  routeName: string;
  controller: Controller;
  router: Router;

  constructor() {
    this.router = Router();
    this.routeName = "/patient";
    this.controller = patientController;
    this.initialRouts();
  }

  initialRouts(): void {
    this.controller.getEndpoints().forEach((endpoint) => {
      this.requestType(endpoint);
    });
  }

  private requestType(endpoint: IEndpoint) {
    switch (endpoint.typeRequest) {
      case RequestType.Get:
        this.router.get(endpoint.getPath(), endpoint.callback);
        console.log(endpoint.getPath());
        break;
      case RequestType.Post:
        this.router.post(endpoint.getPath(), endpoint.callback);
        break;
      case RequestType.Update:
        this.router.put(endpoint.getPath(), endpoint.callback);
        break;
      case RequestType.Delete:
        this.router.delete(endpoint.getPath(), endpoint.callback);
        break;
      default:
        break;
    }
  }
}
