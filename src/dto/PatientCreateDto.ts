export default class PatientCreateDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  pesel: string;
  email: string;
  password: string;
  constructor(
    firstNumber: string,
    lastName: string,
    phoneNumber: string,
    pesel: string
  ) {
    this.firstName = firstNumber;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.pesel = pesel;
  }
}
