import AuthorizationController from "../controllers/AuthorizationController";
import Route from "./Route";

export default class AuthorizationRoute extends Route {
  constructor() {
    super("/auth", new AuthorizationController());
  }
}
