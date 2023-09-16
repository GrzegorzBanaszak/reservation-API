export default class PatientCreateDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  pesel: string;
  email: string;
  password: string;
  static isValid(data: any): boolean {
    return (
      "firstName" in data &&
      "lastName" in data &&
      "phoneNumber" in data &&
      "pesel" in data &&
      "email" in data &&
      "password" in data
    );
  }

  static checkMissingData(data: any): Array<string> {
    const errorMassages = new Array<string>();

    if (!("firstName" in data)) {
      errorMassages.push("Podaj imię");
    }

    if (!("lastName" in data)) {
      errorMassages.push("Podaj nazwisko");
    }

    if (!("pesel" in data)) {
      errorMassages.push("Podaj numer pesel");
    }

    if (!("phoneNumber" in data)) {
      errorMassages.push("Podaj numer telefonu");
    }

    if (!("email" in data)) {
      errorMassages.push("Podaj email");
    }

    if (!("password" in data)) {
      errorMassages.push("Podaj hasło");
    }

    return errorMassages;
  }
}
