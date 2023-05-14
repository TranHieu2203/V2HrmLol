import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';
import { LibrariesModule } from 'src/app/libraries.module';
import { SyncfusionModule } from 'src/app/syncfusion.module';
import { ArticleRoutingModule } from './article-routing.module';
import { StringHtmlPipe } from 'src/app/pipe/string-html.pipe';

import { PrismComponent } from 'src/app/components/prism/prism.component';
import { ArticleCenterComponent } from './article-center/article-center.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleTableComponent } from './article-table/article-table.component';
import { ArticleSyncfusionComponent } from './article-syncfusion/article-syncfusion.component';

@NgModule({
  declarations: [
    PrismComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    ArticleCenterComponent,
    StringHtmlPipe,
    ArticleEditComponent,
    ArticleTableComponent,
    ArticleSyncfusionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LibrariesModule,
    SyncfusionModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
