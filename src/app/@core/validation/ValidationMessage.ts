export class ValidationMessage {

  static CONFIRM_PASSWORD = 'Confirm password didnt match';
  static REGISTER = 'Successfully Registered user';
  static ERROR = 'Error while submitting';
  static MESSAGES  = {

    fullName: {
      required: 'Full Name is required',
      pattern: 'Full Name must be Alphabet Only'
    } ,

    userName: {
      required: 'Username is required',
      pattern: ''
    } ,
    password: {
      required: 'Password is required',
      max: 'password length is too short'
    } ,
    confirmPassword: {
      required: 'Confirm Password is required',
      max: 'password length is too short'
    }
    ,
    number: {
      required: 'Number is required',
      pattern: 'Invalid number'
    } ,
    batch: {
      required: 'Batch is required'
    }
  };
}
