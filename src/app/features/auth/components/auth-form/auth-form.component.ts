import {Component, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '@core/services';
import {ErrorStateMatcher} from '@angular/material/core';
import {Observable} from 'rxjs';

interface FormMaskData {
  hint: string,
  validators: any[],
  messages: { [key: string]: string }
}

const authStateMask = {
  LogIn: ['email', 'password'],
  SignIn: ['email', 'userName', 'password', 'confirmPassword'],
  RequestResetPassword: ['email'],
  ResetPassword: ['password', 'confirmPassword']
};
const formMask: { [key: string]: FormMaskData } = {
  email: {
    hint: 'z.B. email@example.com',
    validators: ['', Validators.required, Validators.email],
    messages: {
      required: 'No Email was provided',
      email: 'Please provide a valid Email',
    },
  },
  userName: {
    hint: 'Max Mustermann | Knackige Rübe',
    validators: ['', Validators.required],
    messages: {
      required: 'No Username was provided',
    },
  },
  password: {
    hint: '',
    validators: ['', Validators.required, Validators.minLength(5)],
    messages: {
      required: 'No password was provided',
      minLength: 'Password has to have a min Length of 5 Characters',
      passwordMatch: 'Password and Confirm Password do not match'
    },
  },
  confirmPassword: {
    hint: 'example Conofrm Password',
    validators: ['', Validators.required, Validators.minLength(5)],
    messages: {
      required: 'No Confirm Password was provided',
      minLength: 'Confirm Password has to have a min length of 5 Characters',
      passwordMatch: 'Password and Confirm Password do not match'
    }
  }
};

export enum AuthState {
  LogIn,
  SignIn,
  RequestResetPassword,
  ResetPassword
}

export class AuthErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  @Input() authState: AuthState;
  // authStateMask = authStateMask;
  // formMask = formMask;
  public floatLabelControl = new FormControl('auto');
  public hideRequiredControl = new FormControl(false);
  public matcher = new AuthErrorStateMatcher();
  public authForm: FormGroup;
  public errorList: string[] = [];
  public submit: () => void;
  authStateMask = {
    LogIn: ['email', 'password'],
    SignIn: ['email', 'userName', 'password', 'confirmPassword'],
    RequestResetPassword: ['email'],
    ResetPassword: ['password', 'confirmPassword']
  };
  formMask: { [key: string]: FormMaskData } = {
    email: {
      hint: 'z.B. email@example.com',
      validators: ['', [Validators.required, Validators.email]],
      messages: {
        required: 'No Email was provided',
        email: 'Please provide a valid Email',
      },
    },
    userName: {
      hint: 'Max Mustermann | Knackige Rübe',
      validators: ['', Validators.required],
      messages: {
        required: 'No Username was provided',
      },
    },
    password: {
      hint: '',
      validators: ['', [Validators.required, Validators.minLength(5)]],
      messages: {
        required: 'No password was provided',
        minLength: 'Password has to have a min Length of 5 Characters',
        passwordMatch: 'Password and Confirm Password do not match'
      },
    },
    confirmPassword: {
      hint: 'example Confirm Password',
      validators: ['', [Validators.required, Validators.minLength(5)]],
      messages: {
        required: 'No Confirm Password was provided',
        minLength: 'Confirm Password has to have a min length of 5 Characters',
        passwordMatch: 'Password and Confirm Password do not match'
      }
    }
  };

  get controlsConfig(): any {
    const controlsConfig: any = {};
    this.getFormFieldList().forEach(formField => {
      controlsConfig[formField] = this.formMask[formField].validators;
    });
    console.log(controlsConfig);
    return controlsConfig;
  }

  get submitData(): any {
    const submitData = {};
    const formData = this.authForm.getRawValue();
    this.getFormFieldList().forEach(formField => {
      submitData[formField] = formData[formField];
    });
    return submitData;
  }

  get b_passwordConfirm(): boolean {
    const formContainsField = (field: string): boolean =>
      this.getFormFieldList().includes(field);
    return formContainsField('confirmPassword') && formContainsField('password');
  }

  getInputType(formField: string): string {
    if (formField === 'email') {
      return 'email';
    }
    if (formField === 'password' || formField === 'confirmPassword') {
      return 'password';
    }
    return 'text';
  }

  private createForm(): void {
    this.authForm =
      this.formBuilder.group(this.controlsConfig, {validators: this.b_passwordConfirm ? this.passwordMatchValidator : null});
    // this.formBuilder.group(this.controlsConfig);
    switch (this.authState) {
      case AuthState.LogIn:
        this.submit = () => this.authService.logIn(this.submitData).subscribe(errorList => this.handleServerValidationError(errorList));
        break;
      case AuthState.SignIn:
        this.submit = () => {
          this.authService.singUp(this.submitData).subscribe(errorList => this.handleServerValidationError(errorList));
        };
        break;
      case AuthState.RequestResetPassword:
        this.submit = () => {
          this.authService.requestResetPassword(this.submitData).subscribe(errorList => this.handleServerValidationError(errorList));
        };
        break;
      case AuthState.ResetPassword:
        this.submit = () => {
          this.authService.resetPassword(this.controlsConfig).subscribe(errorList => this.handleServerValidationError(errorList));
        };
        break;
    }
  }

  getFormFieldList(): string[] {
    return this.authStateMask[AuthState[this.authState]];
  }


  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private handleServerValidationError(errorList: string[]): void {
    this.errorList = errorList;
  }

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
