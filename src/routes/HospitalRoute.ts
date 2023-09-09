import HospitalController from "../controllers/HospitalController";
import { Injector } from "../injection/injector";
import Route from "./Route";

export default class HospitalRoute extends Route<HospitalController> {
  constructor() {
    super("/hospital", HospitalController);
  }
}
