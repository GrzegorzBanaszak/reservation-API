import { RequestType } from "../../enums/RequestType";
import Controller from "../Controller";
import Endpoint from "../Endpoint";
import { getAll } from "./getAll";

export default class PatientController extends Controller {
  constructor() {
    super();
    this.addEndpoint(new Endpoint<any>(getAll, RequestType.Get));
  }
}
