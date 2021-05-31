import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import DynamicForm from '@core/utils/form/dynamic-form';
import DynamicFormData from '@core/utils/form/dynamic-form-data';
import ExchangeObject from '@core/models/exchange-object';
import {AuthErrorStateMatcher} from '@core/components/auth/auth-form/auth-form.component';
import {enumKeys, IExchangeObject} from 'rote-ruebe-types';
import AppHttpClient from '@core/utils/app-http-client';
import Unit, {weightUnit} from '@core/utils/units';


const unitMultiply: Map<string, number> = new Map([
  ['Mg', 0],
  ['Gr', 1000],
  ['Kg', 1000 * 1000],
]);

@Component({
  selector: 'app-my-exchange-object-form',
  templateUrl: './my-exchange-object-form.component.html',
  styleUrls: ['./my-exchange-object-form.component.scss']
})
export class MyExchangeObjectFormComponent implements OnInit {
  /**
   * Form Directive
   * Used to Reset Form
   */
  @ViewChild('f') myNgForm;

  /**
   * Class to Store all Form Data Including:
   * Hints, inputType, validators, errorMessages
   */
  public dynamicFormData = DynamicFormData.fromArray<IExchangeObject>([
    {
      name: 'title',
      inputType: 'text',
      hint: 'PLease insert a Title',
      messages: {},
      validators: ['', [Validators.required]]
    },
    {
      name: 'description',
      inputType: 'text',
      hint: 'Please Describe the Object',
      messages: {},
      validators: ['']
    },
    {
      name: 'amount',
      inputType: 'number',
      hint: 'Object in Weight',
      messages: {},
      validators: []
    },
    {
      name: 'number',
      inputType: 'number',
      hint: 'Number of Objects Available',
      messages: {},
      validators: []
    },
    {
      name: 'place',
      inputType: 'text',
      hint: 'Describe where the Object is Located',
      messages: {},
      validators: ['Beim Acker', Validators.required]
    },
    {
      name: 'exchange',
      inputType: 'text',
      hint: 'Describe how exchange will take place',
      messages: {},
      validators: ['Beim Acker Abholen', Validators.required]
    },
    {
      name: 'expiryDate',
      inputType: 'date',
      hint: 'Expiry Date',
      messages: {},
      validators: [new Date(), Validators.required]
    },
    {
      name: 'b_free',
      inputType: 'checkbox',
      hint: 'Change or Free to Take ?',
      messages: {},
      validators: [true, Validators.required]
    },
    {
      name: 'b_anonymous',
      inputType: 'checkbox',
      hint: 'Provide Anonymously ?',
      messages: {},
      validators: [false, Validators.required]
    },
  ]);

  // Additional Form Data
  public selectedUnit = 'Gr';
  amountUnits: any[] = weightUnit;


  // Form Controls
  public floatLabelControl = new FormControl('auto');
  public hideRequiredControl = new FormControl(false);
  /**
   * Handles when Error should be Displayed
   * Using the Same as the Auth Error State Matcher
   */
  public matcher = new AuthErrorStateMatcher();
  // Date Picker
  minExpiry = new Date();
  /**
   * Filtering Dates, that are before min Expiry
   */
  public myFilter = (d: Date | null): boolean => d < this.minExpiry;

  /**
   * Retrieving Exchange Object Form
   */
  get exchangeObjectForm(): FormGroup {
    return this.dynamicForm?.form;
  }


  constructor(private dynamicForm: DynamicForm, private appHttpClient: AppHttpClient) {
  }

  ngOnInit(): void {
    this.createForm();
    console.log(JSON.stringify(this.exchangeObjectForm.value));
  }

  /**
   * Creating Exchange Object Form
   * @private
   */
  private createForm(): void {
    this.dynamicForm.createForm(this.dynamicFormData);
  }

  /**
   * Resetting Form All Form Data and Validators
   * @private
   */
  private resetForm(): void {
    this.myNgForm.resetForm();
  }

  /**
   * Submitting Form
   * Making Post Http Request
   */
  public submit(): void {
  }

}
