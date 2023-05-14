import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnrxjsCenterComponent } from './learnrxjs-center.component';

describe('LearnrxjsCenterComponent', () => {
  let component: LearnrxjsCenterComponent;
  let fixture: ComponentFixture<LearnrxjsCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnrxjsCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnrxjsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
