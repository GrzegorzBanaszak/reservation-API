import { RequestType } from "../enums/RequestType";

export default interface IEndpoint {
  path: string;
  callback: () => any;
  typeRequest: RequestType;
  params: Array<string>;
  getPath(): string;
}
