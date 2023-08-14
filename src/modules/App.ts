import express, { Express } from "express";
import IApp from "../interfaces/IApp";
import dotenv from "dotenv";
import Router from "../routes/Router";

export default class App implements IApp {
  app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.router();
    this.run();
  }
  router(): void {
    new Router(this.app);
  }
  config(): void {
    dotenv.config();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  run(): void {
    this.app.listen(process.env.PORT, () => {
      console.log("App running on port " + process.env.PORT);
    });
  }
}
