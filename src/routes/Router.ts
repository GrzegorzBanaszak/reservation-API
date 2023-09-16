import { Express } from "express";
import Route from "./Route";
import PatientRoute from "./PatientRoute";
import DoctorRoute from "./DoctorRoute";
import HospitalRoute from "./HospitalRoute";
import AuthorizationRoute from "./AuthorizationRoute";
import Controller from "../controllers/Controller";

export default class Router {
  protected routes = new Array<Route<Controller>>();
  constructor(app: Express) {
    this.routes.push(new PatientRoute());
    // this.routes.push(new DoctorRoute());
    // this.routes.push(new HospitalRoute());
    this.routes.push(new AuthorizationRoute());
    this.initialRoutes(app);
  }

  initialRoutes(app: Express): void {
    this.routes.forEach((route) => {
      app.use("/api" + route.routePath, route.router);
    });
  }
}
