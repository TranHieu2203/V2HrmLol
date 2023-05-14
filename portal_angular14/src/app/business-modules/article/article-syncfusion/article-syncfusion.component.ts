import { Component, OnInit } from '@angular/core';
import { DataManager } from '@syncfusion/ej2-data';
import { SortSettingsModel, SearchSettingsModel, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';

import { ISfGridColumn } from 'src/app/libraries/sf-grid/sf-grid-column';
import { eAlign, eColumnType } from 'src/app/libraries/sf-grid/sf-grid-column';

@Component({
  selector: 'app-article-syncfusion',
  templateUrl: './article-syncfusion.component.html',
  styleUrls: ['./article-syncfusion.component.css']
})
export class ArticleSyncfusionComponent implements OnInit {

  data!: DataManager;
  editSettings!: EditSettingsModel;
  toolbar!: ToolbarItems[];
  sortSettings!: SortSettingsModel;
  searchSettings!: SearchSettingsModel;
  columns!: ISfGridColumn[];

  constructor() { }

  ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.columns = [
      {
        field: "id",
        isPrimaryKey: "true",
        headerText: "ID",
        textAlign: eAlign.Right,
        width: 100,
      },
      {
        field: "artCaption",
        headerText: "Caption",
        textAlign: eAlign.Left,
        width: 200,
      },
      {
        field: "artBody",
        headerText: "Body",
        textAlign: eAlign.Left,
        width: 300,
      },
      {
        headerText: "Edited on",
        field: "artModifiedDate",
        textAlign: eAlign.Right,
        type: eColumnType.datetime,
        format: 'dd-MM-yyyy',
        width: 150,
      },  
    ]
    this.sortSettings = { columns: [{ field: 'id', direction: 'Descending' }] };
    this.searchSettings = { fields: ['artCaption', 'artBody'], operator: 'contains', key: '', ignoreCase: true };
  }
}