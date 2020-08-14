export class Pattern {
  static EMAIL = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  static CITIZENSHIP = '^[\\d./-]+$';
  static NUMBER_DOUBLE = '^[\\d.]+$';
  static NUMBER_MOBILE = '^((\\+91-?)|0)?[0-9]{10}$';
  static NUMBER_POSITIVE = '^[0-9]*$';
  static ALPHABET_ONLY = '^[a-zA-Z ]*$';
}
