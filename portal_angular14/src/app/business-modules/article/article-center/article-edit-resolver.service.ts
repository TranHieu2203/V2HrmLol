import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ArticleService } from '../article.service';

import { IArticle } from '../article';
import { IGetByIdRequest } from 'src/app/interfaces/get-by-id';

@Injectable({
  providedIn: 'root'
})
export class ArticleEditResolverService implements Resolve<IArticle> {

  constructor(private articleService: ArticleService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle> | Observable<never> {
    const id = Number(route.paramMap.get('id'))!;
    const getByIdRequest: IGetByIdRequest = { id };

    return this.articleService.getArticle(getByIdRequest).pipe(
      mergeMap(mergeMapResponse => {
        if (mergeMapResponse) {
          return of(mergeMapResponse.body);
        } else { // id not found
          this.router.navigate(['/article-center']);
          return EMPTY;
        }
      })
    );
  }
}
