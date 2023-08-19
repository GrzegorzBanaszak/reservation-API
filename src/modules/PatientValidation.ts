export default class PatientValidation {
  public static validationPesel(pesel: string) {
    return pesel.length === 11 ? true : false;
  }
  public static validationPhonNumber(phoneNumber: string) {
    const reg = new RegExp(
      "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
    );
    return reg.test(phoneNumber);
  }
}
