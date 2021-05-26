import {FormFieldData, IFormData} from '@core/utils/form/form-field-data';

interface IDynamicFormData {
  formFieldList: FormFieldData[]
}

export default class DynamicFormData<T = any> implements IDynamicFormData {
  formFieldList: FormFieldData[];

  constructor(formFieldList: FormFieldData[]) {
    this.formFieldList = formFieldList;
  }

  /**
   * Generating Dynamic Form Data from Array and JS Objects
   */
  static fromArray<U = any>(dataArray: IFormData<U>[]): DynamicFormData<U> {
    return new DynamicFormData<U>(dataArray.map(d => new FormFieldData<U>(d)));
  }

  public get(key: string): FormFieldData {
    return this.formFieldList.find(f => f.name === key);
  }

}
