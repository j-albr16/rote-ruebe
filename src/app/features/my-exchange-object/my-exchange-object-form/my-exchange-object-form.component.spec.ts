import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExchangeObjectFormComponent } from './my-exchange-object-form.component';

describe('MyExchangeObjectFormComponent', () => {
  let component: MyExchangeObjectFormComponent;
  let fixture: ComponentFixture<MyExchangeObjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExchangeObjectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExchangeObjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
