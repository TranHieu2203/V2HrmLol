import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from '../article.service';
import { RandomImageService } from 'src/app/services/random-image.service';

import { IParagraph } from '../paragraph';
import { IParagraphsRequest } from '../paragraphs-request';
import { IArticle } from '../article';
import { IGetByIdRequest } from 'src/app/interfaces/get-by-id';

import * as Prism from 'prismjs';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  article!: IArticle;
  paragraphs!: IParagraph[];
  req: any;
  randomImage!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public articleService: ArticleService,
    public authService: AuthService,
    public randomImageService: RandomImageService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))!;
    this.articleService.article$.subscribe(x => this.article = x);
    this.articleService.paragraphs$.subscribe(x => this.paragraphs = x);
    this.randomImageService.get().subscribe(x => this.randomImage = x.src);
    this.getArticle(id);
    this.getParagraphs(id);
    Prism.highlightAll();
  }

  getArticle(id: number) {
    const getByIdRequest: IGetByIdRequest = { id: Number(id) };
    this.articleService.getArticle(getByIdRequest)
    .subscribe(response => {
      if (response.ok && response.status === 200) {
        this.article = response.body;
      }
    });
  }

  getParagraphs(id: number) {
    const paragraphsRequest: IParagraphsRequest = { art_id: Number(id) };
    this.articleService.getParagraphs(paragraphsRequest)
    .subscribe(response => {
      console.log("getParagraphs response", response)
      if (response.ok && response.status === 200) {
        this.paragraphs = response.body.list_data;
      }
    });

  }

  gotoArticles(article: IArticle) {
    const articleId = article ? article.artId : null;

    this.router.navigate(['/articles', {
      id: articleId,
      foo: 'foo'
    }]);
  }

}
