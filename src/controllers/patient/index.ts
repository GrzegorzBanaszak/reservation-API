import { RequestType } from "../../enums/RequestType";
import Controller from "../Controller";
import { getAll } from "./getAll";
// TODO:
const patientController = new Controller();
patientController.addEndpoint(getAll, RequestType.Get);

export default patientController;
