import {Observable} from 'rxjs';

export interface LogInUserData{
  email: string;
  password: string
}

export interface SignInUserData {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface RequestResetPasswordUserData {
  email: string;
}

export interface ResetPasswordUserData {
  password: string;
  confirmPassword;
}

export type ErrorList = Array<string>;
