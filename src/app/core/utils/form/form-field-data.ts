import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

interface IValidators {
  required: ValidatorFn;
  email: ValidatorFn;
  min: (min: number) => ValidatorFn;
  passwordMatch;
}

type Messages = {
  [T in keyof IValidators]?: string
}

export interface IFormData<T = any> {
  name: keyof T | string;
  hint: string,
  validators: any[],
  messages: Messages,
  inputType: inputType
}

export type inputType = 'text' | 'email' | 'password' | 'button' | 'color' | 'date' | 'file' | 'number' | 'range' | 'search' | 'checkbox'

export class FormFieldData<T = any> implements IFormData<T> {
  readonly hint: string;
  /**
   * Please Regard Angular Docs to check shorthand Syntax for FormGroup.build()
   * [defaultValue, ValidatorFn | ValidatorFn[], AsyncValidator]
   */
  public validators: any[];
  readonly messages: Messages;
  readonly name;
  readonly inputType: inputType;

  constructor(constr: IFormData) {
    this.hint = constr.hint;
    this.validators = constr.validators;
    this.messages = constr.messages;
    this.name = constr.name;
    this.inputType = constr.inputType ?? 'text';
  };

}
