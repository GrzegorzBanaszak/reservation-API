import express, { Express } from "express";
import IApp from "../interfaces/IApp";
import dotenv from "dotenv";
import Router from "../routes/Router";
import { PrismaLocalClient } from "../db/prisma";

export default class App implements IApp {
  express: Express;

  constructor() {
    this.express = express();

    PrismaLocalClient.getInstancion();
    this.config();
    this.router();
    this.run();
  }
  router(): void {
    new Router(this.express);
  }
  config(): void {
    dotenv.config();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  run(): void {
    this.express.listen(process.env.PORT, () => {
      console.log("App running on port " + process.env.PORT);
    });
  }
}
