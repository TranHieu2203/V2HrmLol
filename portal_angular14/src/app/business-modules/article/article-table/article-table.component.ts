import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ArticleService } from '../article.service';

import { ISmartTableColumn, ISmartTableInput } from 'src/app/libraries/smart-table/smart-table-input';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.css']
})
export class ArticleTableComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  rendered: boolean = false;
  loading = new BehaviorSubject<boolean>(false);
  currentPage = new BehaviorSubject<number>(1);
  pageSize = new BehaviorSubject<number>(10);
  keyword = new BehaviorSubject<string>('');
  columns = new BehaviorSubject<ISmartTableColumn[]>([
    {
      header: "ID",
      accessor: "id"
    },
    {
      header: "Caption",
      accessor: "artCaption"
    },
    {
      header: "Body",
      accessor: "artBody"
    },
    {
      header: "Edited on",
      accessor: "artModifiedDate",
      type: "date",
    },
  ]);

  inputData = new BehaviorSubject<ISmartTableInput | null>(null);
  selectedItem = new BehaviorSubject<any>(null);

  pageCount: number = 0;
  totalRow: number = 0;
  pageSizeOption: number[] = [5, 10, 20, 50, 100];

  onCurrentPageChanged(value: number) { }
  onPageSizeChanged(value: number) { }
  onColumnsChanged(columns: ISmartTableColumn[]) { }

  refreshList() {
    this.loading.next(true);
    console.log(this.columns.value);

    this.articleService.getArticles({
      catId: 7,
      currentPage: this.currentPage.value,
      pageSize: this.pageSize.value,
      keyword: this.keyword.value,
    })
      .subscribe(x => {
        this.loading.next(false);
        if (x.ok && x.status === 200) {
          this.inputData.next({
            columns: this.columns.value,
            primaryKey: "id",
            data: {
              count: x.body.total_row,
              result: x.body.list_data,
            },
            frozenColumnCount: 3,
            cellPadding: '4px 5px',
          })
        }
      })

  }

  ngOnInit(): void {

    this.inputData.subscribe(x => {
      this.totalRow = x?.data?.count!;
      this.pageCount = Math.ceil(x?.data?.count! / this.pageSize.value);
    })

    this.currentPage.subscribe(x => this.rendered && this.refreshList());
    this.pageSize.subscribe(x => this.rendered && this.refreshList());
    this.keyword.subscribe(x => this.rendered && this.refreshList());
    this.columns.subscribe(x => this.rendered && this.refreshList());

    this.rendered = true;
    this.refreshList();
  }

}
