export default class CustomError {
  message: string | Array<string>;
  constructor(message: string | Array<string>) {
    this.message = message;
  }
}
