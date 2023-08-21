import express, { Express } from "express";
import http, { Server } from "http";
import IApp from "../interfaces/IApp";
import dotenv from "dotenv";
import Router from "../routes/Router";
import { PrismaLocalClient } from "../db/prisma";
import ErrorHandler from "../middleware/ErrorHandler";

export default class App implements IApp {
  express: Express;
  server: Server;

  constructor() {
    this.express = express();

    PrismaLocalClient.getInstancion();
    this.config();
    this.router();
    this.run();
  }
  router(): void {
    new Router(this.express);
    const errHandler = new ErrorHandler();
    this.express.use(errHandler.handler);
  }
  config(): void {
    dotenv.config();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  run(): void {
    this.server = http.createServer(this.express);
    this.server.listen(process.env.PORT);
  }
}
