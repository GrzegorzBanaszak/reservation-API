import HospitalController from "../controllers/HospitalController";
import Route from "./Route";

export default class HospitalRoute extends Route {
  constructor() {
    super("/hospital", new HospitalController());
  }
}
