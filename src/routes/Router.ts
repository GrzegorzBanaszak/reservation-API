import { Express } from "express";
import Route from "./Route";
import PatientRoute from "./PatientRoute";
import DoctorRoute from "./DoctorRoute";

export default class Router {
  protected routes: Array<Route>;
  constructor(app: Express) {
    this.routes.push(new PatientRoute());
    this.routes.push(new DoctorRoute());
    this.initialRoutes(app);
  }

  initialRoutes(app: Express): void {
    this.routes.forEach((route) => {
      app.use("/api" + route.routePath, route.router);
    });
  }
}
