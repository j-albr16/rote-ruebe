import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '@core/services';
import {ErrorStateMatcher} from '@angular/material/core';
import DynamicFormData from '@core/utils/form/dynamic-form-data';
import DynamicForm from '@core/utils/form/dynamic-form';

export enum AuthState {
  LogIn,
  SignIn,
  RequestResetPassword,
  ResetPassword
}

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnChanges {
  @Input() authState: AuthState;
  @ViewChild('f') myNgForm: NgForm;

  // Actual Form Data
  public errorMessage: string;
  public submit: () => void;

  get authForm(): FormGroup {
    return this.dynamicForm?.form;
  }


  // State Dependant Form Fields
  authStateMask = {
    LogIn: ['email', 'password'],
    SignIn: ['email', 'userName', 'password', 'confirmPassword'],
    RequestResetPassword: ['email'],
    ResetPassword: ['password', 'confirmPassword']
  };

  public dynamicFormData: DynamicFormData = DynamicFormData.fromArray(
    [
      {
        name: 'email',
        hint: 'z.B. email@example.com',
        validators: ['', [Validators.required, Validators.email]],
        inputType: 'email',
        messages: {
          required: 'No Email was provided',
          email: 'Please provide a valid Email',
        },
      },
      {
        name: 'userName',
        hint: 'Max Mustermann | Knackige Rübe',
        inputType: 'text',
        validators: ['', Validators.required],
        messages: {
          required: 'No Username was provided',
        },
      },
      {
        name: 'password',
        inputType: 'password',
        hint: '',
        validators: ['', [Validators.required, Validators.minLength(5)]],
        messages: {
          required: 'No password was provided',
          min: 'Password has to have a min Length of 5 Characters',
          passwordMatch: 'Password and Confirm Password do not match'
        },
      },
      {
        name: 'confirmPassword',
        inputType: 'password',
        hint: 'example Confirm Password',
        validators: ['', [Validators.required, Validators.minLength(5)]],
        messages: {
          required: 'No Confirm Password was provided',
          min: 'Confirm Password has to have a min length of 5 Characters',
          passwordMatch: 'Password and Confirm Password do not match'
        }
      }
    ]
  );


  /**
   * Getter that checks whether Confirm Password and Password are Required. Is Dependant on AuthState
   */
  get b_passwordConfirm(): boolean {
    const formContainsField = (field: string): boolean =>
      this.formFieldList.includes(field);
    return formContainsField('confirmPassword') && formContainsField('password');
  }

  /**
   * Generate Form on Component init. Generate Dynamic Form dependant on const Data an AuthState
   * @private
   */
  private createForm(): void {
    this.dynamicForm.createForm(this.dynamicFormData, {
      formFieldKeyList: this.formFieldList,
      crossFieldValidators: this.b_passwordConfirm ? this.passwordMatchValidator : null
    });
    // console.log(JSON.stringify(this.authForm));
    switch (this.authState) {
      case AuthState.LogIn:
        this.submit = () => {
          this.resetForm();
          this.authService.logIn(this.dynamicForm.submitData).subscribe(errorMessage => this.handleServerValidationError(errorMessage));
        };
        break;
      case AuthState.SignIn:
        this.submit = () => {
          this.resetForm();
          this.authService.singUp(this.dynamicForm.submitData).subscribe(errorMessage => this.handleServerValidationError(errorMessage));
        };
        break;
      case AuthState.RequestResetPassword:
        this.submit = () => {
          this.resetForm();
          this.authService.requestResetPassword(this.dynamicForm.submitData).subscribe(errorMessage => {
            return this.handleServerValidationError(errorMessage);
          });
        };
        break;
      case AuthState.ResetPassword:
        this.submit = () => {
          this.resetForm();
          this.authService.resetPassword(this.dynamicForm.submitData)
            .subscribe(errorMessage => this.handleServerValidationError(errorMessage));
        };
        break;
    }
  }

  /**
   * Retrieving Form Field Data depending on Auth State
   */
  get formFieldList(): string[] {
    return this.authStateMask[AuthState[this.authState]];
  }


  constructor(private dynamicForm: DynamicForm, private authService: AuthService) {
  }

  ngOnChanges(): void {
    this.createForm();
  }

  private handleServerValidationError(errorMessage: string | null): void {
    this.errorMessage = errorMessage;
  }

  private resetForm(): void {
    this.myNgForm.resetForm();
  }

  isErrorState(control: AbstractControl): boolean {
    const isSubmitted = this.myNgForm && this.myNgForm.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }

  /**
   * Custom Cross Field Validator. Checks whether Password Matches Confirm Password
   * @param control Abstract Control is parsed into Validator by Default
   */
  public passwordMatchValidator = (control: AbstractControl): { [key: string]: any } | null => {
    const passwordControl: AbstractControl = control.get('password');
    const confirmPasswordControl: AbstractControl = control.get('confirmPassword');

    if (passwordControl.value !== confirmPasswordControl.value) {
      const error = {passwordMatch: true};
      passwordControl.setErrors(error);
      confirmPasswordControl.setErrors(error);
      return error;
    }

    passwordControl.setErrors(null);
    confirmPasswordControl.setErrors(null);
    return null;
  };
}
