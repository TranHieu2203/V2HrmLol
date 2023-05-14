import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerCenterComponent } from './project-manager-center.component';

describe('ProjectManagerCenterComponent', () => {
  let component: ProjectManagerCenterComponent;
  let fixture: ComponentFixture<ProjectManagerCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectManagerCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectManagerCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
