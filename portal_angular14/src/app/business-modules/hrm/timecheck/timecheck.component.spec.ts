import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimecheckComponent } from './timecheck.component';

describe('TimecheckComponent', () => {
  let component: TimecheckComponent;
  let fixture: ComponentFixture<TimecheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimecheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimecheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
