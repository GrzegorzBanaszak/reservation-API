export default class CustomError {
  code: string;
  message: string | Array<string>;
  constructor(message: string | Array<string>) {
    this.message = message;
  }
}
