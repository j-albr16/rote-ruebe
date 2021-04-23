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
  constructor(private route: ActivatedRoute) { }
  setAuthState(): void {
    console.log('Setting Auth State');
    this.route.paramMap.subscribe(params => {
      this.authState = AuthState[params.get('authState')] ?? AuthState.LogIn;
    });
  }

  ngOnInit(): void {
    this.setAuthState()
  }

}
