import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyExchangeObjectFormComponent} from './my-exchange-object-form/my-exchange-object-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@core/utils/material/material.module';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [MyExchangeObjectFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  providers: []
})
export class MyExchangeObjectModule {
}
