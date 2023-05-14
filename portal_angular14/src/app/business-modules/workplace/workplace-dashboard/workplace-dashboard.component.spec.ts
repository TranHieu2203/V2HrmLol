import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkplaceDashboardComponent } from './workplace-dashboard.component';

describe('WorkplaceDashboardComponent', () => {
  let component: WorkplaceDashboardComponent;
  let fixture: ComponentFixture<WorkplaceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkplaceDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkplaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
