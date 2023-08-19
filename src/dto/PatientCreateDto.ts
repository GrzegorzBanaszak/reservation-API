export default class PatientCreateDto {
  fisrtName: string;
  lastName: string;
  phoneNumber: string;
  pesel: string;
  constructor(
    firstNumber: string,
    lastName: string,
    phoneNumber: string,
    pesel: string
  ) {
    this.fisrtName = firstNumber;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.pesel = pesel;
  }
}
