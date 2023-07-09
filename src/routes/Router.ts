import IRoute from "../interfaces/IRoute";
import PatientRoute from "./PatientRoute";
import { Express } from "express";
export default class Router {
  protected routes: Array<IRoute>;
  constructor(app: Express) {
    this.routes = new Array<IRoute>();
    this.routes.push(new PatientRoute());
    this.initRoutes(app);
  }

  initRoutes(app: Express) {
    this.routes.forEach((route) => {
      app.use(route.routeName, route.router);
    });
  }
}
