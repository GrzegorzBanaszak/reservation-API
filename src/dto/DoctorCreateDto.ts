export default class DoctorCreateDto {
  firstName: string;
  lastName: string;
  specialization: string;
  phoneNumber: string;
  email: string;
  password: string;

  static isValid(data: any): boolean {
    return (
      "firstName" in data &&
      "lastName" in data &&
      "specialization" in data &&
      "phoneNumber" in data &&
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

    if (!("specialization" in data)) {
      errorMassages.push("Podaj specjalizacje");
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
