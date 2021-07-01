import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTopBarComponent } from './filter-top-bar.component';

describe('FilterTopBarComponent', () => {
  let component: FilterTopBarComponent;
  let fixture: ComponentFixture<FilterTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
