import PatientController from "../controllers/PatientController";
import Route from "./Route";

export default class PatientRoute extends Route<PatientController> {
  constructor() {
    super("/patient", PatientController);
  }
}
