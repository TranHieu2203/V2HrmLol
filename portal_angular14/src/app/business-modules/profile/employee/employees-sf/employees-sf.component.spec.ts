import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesSfComponent } from './employees-sf.component';

describe('EmployeesSfComponent', () => {
  let component: EmployeesSfComponent;
  let fixture: ComponentFixture<EmployeesSfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesSfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesSfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
