export default class CustomError {
  message: string | Array<string>;
  constructor(message: string | Array<string>) {
    this.message = message;
  }

  public getErrorMessage(): { message: Array<string> } {
    if (Array.isArray(this.message)) {
      return { message: this.message };
    } else {
      return { message: [this.message] };
    }
  }
}
