import express, { Express } from "express";
import IApp from "../interfaces/IApp";
export default class App implements IApp {
  app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.run();
  }
  //TODO: Add routes
  routes(): void {
    throw new Error("Method not implemented.");
  }
  config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  run(): void {
    this.app.listen(() => {
      console.log("App running on port " + process.env.PORT);
    });
  }
}
