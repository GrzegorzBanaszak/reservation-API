import { PrismaClient } from "@prisma/client";
import { Express } from "express";
import Route from "./Route";

export default class Router {
  protected routes: Array<Route>;
  protected prismaClient: PrismaClient;

  constructor(app: Express, prismaClient: PrismaClient) {}
}
