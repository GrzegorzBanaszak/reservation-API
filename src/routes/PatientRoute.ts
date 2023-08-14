import PatientController from "../controllers/patient/PatientController";
import Route from "./Route";

export default class PatientRoute extends Route {
  constructor() {
    super("/patient", new PatientController());
  }
}
