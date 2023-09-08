import express, { Express } from "express";
import cors from "cors";
import http, { Server } from "http";
import dotenv from "dotenv";
import Router from "../routes/Router";
import ErrorHandler from "../middleware/ErrorHandler";
import cookieParser from "cookie-parser";

export default class App {
  express: Express;
  server: Server;

  constructor() {
    this.express = express();

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
    this.express.use(
      cors({
        credentials: true,
        origin: true,
      })
    );
    this.express.use(cookieParser());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  run(): void {
    this.server = http.createServer(this.express);
    this.server.listen(process.env.PORT);
  }
}
