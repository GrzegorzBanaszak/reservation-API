import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import Route from "./Route";
import PatientRoute from "./PatientRoute";

export default class Router {
  protected routes: Array<Route>;
  constructor(app: Express) {
    const patientRoute = new PatientRoute();
    app.use("/api" + patientRoute.routePath, patientRoute.router);
  }
}
