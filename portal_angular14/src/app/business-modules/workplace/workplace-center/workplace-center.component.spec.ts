import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceCenterComponent } from './workplace-center.component';

describe('WorkplaceCenterComponent', () => {
  let component: WorkplaceCenterComponent;
  let fixture: ComponentFixture<WorkplaceCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkplaceCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkplaceCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
