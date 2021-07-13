import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {PrimaryButtonComponent} from './components/primary-button/primary-button.component';
import {ClickOutsideDirective} from './Directives/utils/click-outside.directive';
import { CheckboxComponent } from './components/checkbox/checkbox.component';


@NgModule({
  declarations: [
    PrimaryButtonComponent, ClickOutsideDirective, CheckboxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
    PrimaryButtonComponent,
    ClickOutsideDirective,
  ],
})
export class SharedModule {
}
