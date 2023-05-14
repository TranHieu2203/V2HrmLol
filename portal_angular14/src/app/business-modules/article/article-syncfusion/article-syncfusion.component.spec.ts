import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSyncfusionComponent } from './article-syncfusion.component';

describe('ArticleSyncfusionComponent', () => {
  let component: ArticleSyncfusionComponent;
  let fixture: ComponentFixture<ArticleSyncfusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSyncfusionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleSyncfusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
