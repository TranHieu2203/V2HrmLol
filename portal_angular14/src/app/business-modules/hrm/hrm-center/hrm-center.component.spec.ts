import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmCenterComponent } from './hrm-center.component';

describe('HrmCenterComponent', () => {
  let component: HrmCenterComponent;
  let fixture: ComponentFixture<HrmCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrmCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
