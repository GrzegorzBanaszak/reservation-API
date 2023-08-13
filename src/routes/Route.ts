import { Router } from "express";
import Controller from "../controllers/Controller";

export default class Route {
  router: Router;
  routePath: string;
  routeController: Controller;
  constructor(routePath: string) {
    this.routePath = routePath;
    this.router = Router();
  }
  // TODO: Dodanie endpointów kontrolera do routera
  initialRoutes(): void {}
}
