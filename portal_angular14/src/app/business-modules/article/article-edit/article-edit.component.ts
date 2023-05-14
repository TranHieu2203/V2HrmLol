import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DialogService } from 'src/app/services/dialog.service';
import { ArticleService } from '../article.service';

import { IArticle } from '../article';
import { IGetByIdRequest } from 'src/app/interfaces/get-by-id';
import { ICategory } from '../category';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  loading: boolean = false;
  article!: IArticle;
  articleForm!: FormGroup;

  categories!: ICategory[];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
  ) {
    this.articleForm = this.formBuilder.group({
      catID: ['', Validators.required],
      artBody: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        console.log('route.data subscribe response: ', data)
        const article: IArticle = data['article'];
        this.article = article;
        this.articleForm.patchValue({ artBody: article.artBody })

      })
    this.articleService.categories$.subscribe(x => this.categories = x);
  }

  get formControls() { return this.articleForm.controls; }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.article || this.article.artBody === this.formControls['artBody'].value) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  getArticle(id: number) {
    const getByIdRequest: IGetByIdRequest = { id: Number(id) };
    this.articleService.getArticle(getByIdRequest)
      .subscribe(response => {
        if (response.ok && response.status === 200) {
          this.article = response.body;
          this.articleForm.patchValue({ artBody: response.body.artBody })
        }
      });
  }

  submit() {

  }

}
