import PatientController from "../controllers/PatientController";
import Route from "./Route";

export default class PatientRoute extends Route {
  constructor() {
    super("/patient", new PatientController());
  }
}
