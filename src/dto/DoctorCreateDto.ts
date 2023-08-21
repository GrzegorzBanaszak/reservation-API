export default class DoctorCreateDto {
  firstName: string;
  lastName: string;
  specialization: string;
  phoneNumber: string;

  /**
   *
   */
  constructor(
    firstName: string,
    lastName: string,
    specialization: string,
    phoneNumber: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.specialization = specialization;
  }
}
