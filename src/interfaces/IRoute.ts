import { Router } from "express";
import Controller from "../controllers/Controller";

export default interface IRoute {
  routeName: string;
  controller: Controller;
  router: Router;
  initialRouts(): void;
}
