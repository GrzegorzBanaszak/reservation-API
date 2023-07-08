import expres, { Express } from "express";

export default class App {
  app: Express;

  constructor() {
    this.app = expres();
  }
}
