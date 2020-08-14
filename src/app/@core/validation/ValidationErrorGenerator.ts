import {FormArray, FormGroup} from '@angular/forms';
import {ValidationMessage} from './ValidationMessage';

export class ValidationErrorGenerator{
 static validationMessages = ValidationMessage.MESSAGES;
 static errorList = [];

  static logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl && abstractControl.invalid) {
        abstractControl.markAsTouched();
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.errorList.push(messages[errorKey]);
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control);
          }
        }
      }
    });
  }

   static async getErrorList(group: FormGroup){
    ValidationErrorGenerator.errorList = [];
    await ValidationErrorGenerator.logValidationErrors(group);
    return ValidationErrorGenerator.errorList;
  }
}
