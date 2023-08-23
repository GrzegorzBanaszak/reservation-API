export default class HospitalCreateDto {
  name: string;
  city: string;
  street: string;
  localNumber: string;
  /**
   *
   */
  constructor(name: string, city: string, street: string, localNumber: string) {
    this.name = name;
    this.city = city;
    this.street = street;
    this.localNumber = localNumber;
  }
}
