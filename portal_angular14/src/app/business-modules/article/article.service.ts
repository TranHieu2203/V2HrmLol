import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { IArticlesRequest } from './articles-request';
import { IParagraphsRequest } from './paragraphs-request';

import { ICategory } from './category';
import { IArticles } from './articles';
import { IArticle } from './article';
import { IParagraph } from './paragraph';
import { ICategoriesRequest } from './categories-request';
import { IGetByIdRequest } from 'src/app/interfaces/get-by-id';

import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { AuthService, SERVER3, SERVER4 } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseURL = ''
  loading = new BehaviorSubject<boolean>(false);
  article$ = new BehaviorSubject<IArticle>({});
  articles$ = new BehaviorSubject<IArticles>({ total_row: 0, list_data: []});
  paragraphs$ = new BehaviorSubject<IParagraph[]>([]);
  categories$ = new BehaviorSubject<ICategory[]>([])

  constructor(
    private commonHttpRequestService: CommonHttpRequestService,
    private authService: AuthService,
  ) { 
    this.baseURL = this.authService.serverModel.baseUrl;
  }

  getArticles(articlesRequest: IArticlesRequest): Observable<any> {
    this.loading.next(true);

    return this.commonHttpRequestService.makePostRequest(
      'getArticles',
      `${this.baseURL}/art/article-list`,
      articlesRequest
    );
  }

  getParagraphs(paragraphsRequest: IParagraphsRequest): Observable<any> {
    this.loading.next(true);

    return this.commonHttpRequestService.makePostRequest(
      'getParagraphs',
      `${this.baseURL}/parag/paragraph-list`,
      paragraphsRequest,
    );

  }

  getArticle(getByIdRequest: IGetByIdRequest): Observable<any> {
    this.loading.next(true);

    return this.commonHttpRequestService.makePostRequest(
      'getArticle',
      `${this.baseURL}/art/article-one`,
      getByIdRequest
    );

  }

  getCategories(categoriesRequest: ICategoriesRequest): Observable<any> {
    this.loading.next(true);

    return this.commonHttpRequestService.makePostRequest(
      'getCategories',
      `${this.baseURL}/cat/category-list`,
      categoriesRequest
    );

  }
}
