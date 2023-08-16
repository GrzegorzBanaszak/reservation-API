import { Router } from "express";
import Controller from "../controllers/Controller";
import Endpoint from "../controllers/Endpoint";
import { RequestType } from "../enums/RequestType";
import asyncHandelr from "express-async-handler";

export default class Route {
  router: Router;
  routePath: string;
  routeController: Controller;
  constructor(routePath: string, controller: Controller) {
    this.routePath = routePath;
    this.router = Router();
    this.routeController = controller;
    this.initialRoutes();
  }

  //Inicjalizacja scieżek
  initialRoutes(): void {
    this.routeController.endpoints.forEach((endpint) => {
      this.addRoute(endpint);
    });
  }
  // TODO: Dodanie scieżel dla delete i update
  addRoute(endpoint: Endpoint): void {
    switch (endpoint.typeRequest) {
      case RequestType.Get:
        this.router.get(endpoint.path, asyncHandelr(endpoint.callback));
        break;
      case RequestType.Post:
        this.router.post(endpoint.path, asyncHandelr(endpoint.callback));
        break;
    }
  }
}
