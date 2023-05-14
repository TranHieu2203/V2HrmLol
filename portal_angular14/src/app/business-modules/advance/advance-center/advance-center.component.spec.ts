import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceCenterComponent } from './advance-center.component';

describe('AdvanceCenterComponent', () => {
  let component: AdvanceCenterComponent;
  let fixture: ComponentFixture<AdvanceCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
