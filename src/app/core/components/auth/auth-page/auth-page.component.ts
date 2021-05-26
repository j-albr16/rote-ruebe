import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthState} from '../auth-form/auth-form.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  public authState;

  constructor(private route: ActivatedRoute) {
  }

  setAuthState(authState: keyof typeof AuthState = null): void {
    if (authState) {
      this.authState = AuthState[authState];
      return null;
    }
    this.route.paramMap.subscribe(params => {
      this.authState = AuthState[params.get('authState')] ?? AuthState.LogIn;
    });
  }

  ngOnInit(): void {
    this.setAuthState();
  }

  isAuthState(authState: keyof typeof AuthState): boolean {
    return AuthState[authState] === this.authState;
  }

}
