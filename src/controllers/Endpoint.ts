import { RequestType } from "../enums/RequestType";
import IEndpoint from "../interfaces/IEndpoint";

export default class Endpoint implements IEndpoint {
  path: string;
  callback: () => any;
  typeRequest: RequestType;
  params: string[];

  constructor(
    callback: () => any,
    requestType: RequestType,
    params?: Array<string>
  ) {
    this.path = callback.name;
    this.callback = callback;
    this.typeRequest = requestType;
    if (params) {
      this.params = params;
    }
  }
  getPath(): string {
    if (this.params) {
      let path = `/${this.path}`;
      this.params.forEach((p) => {
        path += `/:${p}`;
      });

      return path;
    } else {
      return `/${this.path}`;
    }
  }
  getEndpoint(): { path: string; callback: () => void } {
    return {
      path: this.path,
      callback: this.callback,
    };
  }
}
