import { TestBed } from '@angular/core/testing';

import { ArticleEditResolverService } from './article-edit-resolver.service';

describe('ArticleEditResolverService', () => {
  let service: ArticleEditResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleEditResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
