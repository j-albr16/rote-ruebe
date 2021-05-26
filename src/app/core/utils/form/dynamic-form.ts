import {AbstractControl, FormBuilder, FormGroup, Validator, ValidatorFn} from '@angular/forms';
import DynamicFormData from '@core/utils/form/dynamic-form-data';
import {FormFieldData} from '@core/utils/form/form-field-data';

interface CreateOptions {
  crossFieldValidators?: ValidatorFn[] | ValidatorFn | null;
  formFieldKeyList?: string[] | null;
}

export function appDynamicFormGenerator(formBuilder: FormBuilder): DynamicForm {
  return new DynamicForm(formBuilder);
}

export default class DynamicForm {
  /**
   * The Actual Form. Receives All Data from Forms.
   * More Infos in Angular docs
   */
  public form: FormGroup;
  /**
   * Custom Form Data Object. Necessary to Dynamically Generating form.
   * Also Includes Hints and Error Messages
   */
  private formData: DynamicFormData;
  /**
   * List of Selected FormFieldKeys.
   * Only Included FormFieldNames are Rendered and Use to build Form
   */
  public formFieldKeyList: string[];
  public formStates: { [key: string]: string[] };

  constructor(public formBuilder: FormBuilder) {
  }

  public createForm(dynamicFormData: DynamicFormData, options: CreateOptions = {
    crossFieldValidators: null,
    formFieldKeyList: dynamicFormData.formFieldList.map(e => e.name)
  }): void {

    // Setting Form Data and formFieldKeyList
    this.formData = dynamicFormData;
    this.formFieldKeyList = options.formFieldKeyList;

    // Creating Form with FormBuilder
    console.log(JSON.stringify(this.formBuilder));
    this.form = this.formBuilder.group(this.getFormGroupObject(dynamicFormData), {
      validators: options.crossFieldValidators,
    });
  }

  /**
   * Generating Form Group Data for Each given FormField. By Default All FormFields in DynamicFormField Data are Generated
   */
  getFormGroupObject(dynamicFormData: DynamicFormData): { [key: string]: AbstractControl } {
    const object = {};
    this.formFieldKeyList.forEach(f => {
      object[f] = dynamicFormData.get(f).validators;
    });
    return object;
  }

  /**
   * Retrieving Submit Data from Form Data
   */
  get submitData(): any {
    const submitData = {};

    // Retrieving Form Data
    const formData = this.form.getRawValue();

    // Generating Submit Object FOr Each Selected Form Field
    this.formFieldKeyList.forEach(formKey => {
      submitData[formKey] = formData[formKey];
    });
    return submitData;
  }


}
