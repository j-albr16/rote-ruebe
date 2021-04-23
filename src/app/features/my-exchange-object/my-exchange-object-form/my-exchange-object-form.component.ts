import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-my-exchange-object-form',
  templateUrl: './my-exchange-object-form.component.html',
  styleUrls: ['./my-exchange-object-form.component.scss']
})
export class MyExchangeObjectFormComponent implements OnInit {
  profileForm = this.formBuilder.group({
    });
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
