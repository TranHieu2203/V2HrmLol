import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts } from '@angular/router';

import { slideInAnimation } from './animations'

import { ArticleService } from '../article.service';

import { ICategory } from '../category';

@Component({
  selector: 'app-article-center',
  templateUrl: './article-center.component.html',
  styleUrls: ['./article-center.component.css'],
  animations: [slideInAnimation]
})
export class ArticleCenterComponent implements OnInit {

  constructor(
    private contexts: ChildrenOutletContexts,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
    .subscribe(data => {
      console.log('route.data subscribe response: ', data)
      const categories: ICategory[] = data['categories'];
      this.articleService.categories$.next(categories);
    })

  }

  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
