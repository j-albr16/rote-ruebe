import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SvgComponent} from './components/svg/svg.component';
import {PrimaryButtonComponent} from './components/primary-button/primary-button.component';
import { ClickOutsideDirective } from './Directives/click-outside.directive';


@NgModule({
  declarations: [
    SvgComponent, PrimaryButtonComponent, ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
    exports: [
        RouterModule,
        SvgComponent,
        PrimaryButtonComponent,
        ClickOutsideDirective,
    ],
})
export class SharedModule {
}
