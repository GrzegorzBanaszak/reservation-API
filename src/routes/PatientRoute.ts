import PatientController from "../controllers/PatientController";
import { Injector } from "../injection/injector";
import Route from "./Route";

export default class PatientRoute extends Route {
  constructor() {
    super("/patient", Injector.resolve(PatientController));
  }
}
