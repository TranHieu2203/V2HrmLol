import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleCenterComponent } from './article-center/article-center.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleTableComponent } from './article-table/article-table.component';
import { ArticleSyncfusionComponent } from './article-syncfusion/article-syncfusion.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';

import { ArticleCenterResolverService } from './article-center/article-center-resolver.service';
import { ArticleEditResolverService } from './article-center/article-edit-resolver.service';


import { AuthGuard } from 'src/app/guards/auth.guard';
import { CanDeactivateGuard } from './article-edit/can-deactivate.guard';

const articleRoutes: Routes = [
  {
    path: '',
    component: ArticleCenterComponent,
    canActivate: [AuthGuard],
    resolve: {
      categories: ArticleCenterResolverService
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'articles',
            component: ArticlesComponent,
            data: { animation: 'articles' },
          },
          {
            path: 'article/:id',
            component: ArticleDetailComponent,
            data: { animation: 'article' },
          },
          {
            path: 'articles-table',
            component: ArticleTableComponent,
          },
          {
            path: 'articles-syncfusion',
            component: ArticleSyncfusionComponent,
          },
          {
            path: 'article-edit/:id',
            component: ArticleEditComponent,
            canDeactivate: [CanDeactivateGuard],
            data: { animation: 'article' },
            resolve: {
              article: ArticleEditResolverService
            }
          },
          {
            path: '',
            redirectTo: 'articles',
            pathMatch: 'full',
          },
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(articleRoutes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
