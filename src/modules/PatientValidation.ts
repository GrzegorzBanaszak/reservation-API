export default class PatientValidation {
  public static validationPesel(pesel: string) {
    return pesel.length === 11 ? true : false;
  }
  public static validationPhonNumber(phoneNumber: string) {
    const regPatern =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const reg = new RegExp(regPatern);
    return reg.test(phoneNumber);
  }
}
