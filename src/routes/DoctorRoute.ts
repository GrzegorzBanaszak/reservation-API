import DoctorController from "../controllers/DoctorController";
import Route from "./Route";

export default class DoctorRoute extends Route<DoctorController> {
  constructor() {
    super("/doctor", DoctorController);
  }
}
