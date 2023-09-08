import Endpoint from "../modules/Endpoint";
import ErrorHandler from "../middleware/ErrorHandler";

export default class Controller {
  endpoints: Array<Endpoint>;
  errorHandler: ErrorHandler;
  constructor() {
    //Aby client działał poprawnie funkcje w pomniejszych kontrolerach muszą zwracać funkcje
    this.errorHandler = new ErrorHandler();
    this.endpoints = new Array<Endpoint>();
  }
  addEndpoint(endpoint: Endpoint): void {
    this.endpoints.push(endpoint);
  }
}
