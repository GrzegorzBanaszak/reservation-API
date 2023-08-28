import { Request, Response, NextFunction, Router } from "express";
import Controller from "../controllers/Controller";
import Endpoint from "../modules/Endpoint";
import { RequestType } from "../enums/RequestType";
import asyncHandler from "express-async-handler";

export default class Route {
  router: Router;
  routePath: string;
  routeController: Controller;
  constructor(routePath: string, controller: Controller) {
    this.routePath = routePath;
    this.router = Router();
    this.routeController = controller;
    this.initialRoutes();
  }

  //Inicjalizacja scieżek
  initialRoutes(): void {
    this.routeController.endpoints.forEach((endpint) => {
      this.addRoute(endpint);
    });
  }
  addRoute(endpoint: Endpoint): void {
    let callback = new Array<
      (req: Request, res: Response, next: NextFunction) => void
    >();

    if (endpoint.middleware) {
      callback = this.initMiddleware(endpoint.middleware);
    }
    switch (endpoint.typeRequest) {
      case RequestType.Get:
        this.router.get(
          endpoint.path,
          ...callback,
          asyncHandler(endpoint.callback)
        );
        break;
      case RequestType.Post:
        this.router.post(
          endpoint.path,
          ...callback,
          asyncHandler(endpoint.callback)
        );
        break;
      case RequestType.Update:
        this.router.put(
          endpoint.path,
          ...callback,
          asyncHandler(endpoint.callback)
        );
        break;
      case RequestType.Delete:
        this.router.delete(
          endpoint.path,
          ...callback,
          asyncHandler(endpoint.callback)
        );
        break;
    }
  }

  initMiddleware(
    middleware: Array<(req: Request, res: Response, next: NextFunction) => void>
  ) {
    return middleware.map((m) => {
      return asyncHandler(m);
    });
  }
}
