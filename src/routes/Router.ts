import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import Route from "./Route";

export default class Router {
  protected routes: Array<Route>;
  constructor(app: Express) {}
}
