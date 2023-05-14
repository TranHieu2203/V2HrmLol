import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticles } from '../articles';

import { ArticleService } from '../article.service';
import { RandomImageService } from 'src/app/services/random-image.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles!: IArticles;
  selectedId = 0;
  randomImages!: string[];

  constructor(
    public articleService: ArticleService,
    private route: ActivatedRoute,
    private randomImageService: RandomImageService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    if (id) this.selectedId = parseInt(id);
    this.getArticles();

  }

  getArticles() {
    this.articleService.getArticles({
      catId: 7,
      currentPage: 1,
      keyword: '',
      pageSize: 10,
    })
      .subscribe(response => {
        console.log("Standard response: ", response)
        if (response.ok && response.status === 200) {
          this.articles = response.body;
          this.randomImages = [];
          response.body.list_data.map(() => {
            this.randomImageService.get().subscribe(x => this.randomImages.push(x.src))
          })

        }
      });
  }

}
