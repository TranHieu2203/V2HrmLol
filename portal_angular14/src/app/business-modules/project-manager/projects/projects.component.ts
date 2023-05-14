import { Component, OnInit } from '@angular/core';

import { DataManager } from '@syncfusion/ej2-data';
import { SortSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';

import { ISfGridColumn } from 'src/app/libraries/sf-grid/sf-grid-column';
import { eAlign } from 'src/app/libraries/sf-grid/sf-grid-column';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  data!: DataManager;
  sortSettings!: SortSettingsModel;
  searchSettings!: SearchSettingsModel;
  columns!: ISfGridColumn[];

  constructor() { }

  ngOnInit(): void {
    this.columns = [
      {
        field: 'id',
        isPrimaryKey: 'true',
        headerText: 'ID',
        textAlign: eAlign.Right,
        width: 80,
      },
      {
        field: 'code',
        headerText: 'Code',
        textAlign: eAlign.Left,
        width: 150,
      },
      {
        field: 'project_name',
        headerText: 'Project',
        textAlign: eAlign.Left,
        width: 200,
      },
      {
        field: 'leader_fullname',
        headerText: 'Leader',
        textAlign: eAlign.Left,
        width: 200,
      },
      {
        field: 'client_name',
        headerText: 'Client',
        textAlign: eAlign.Left,
        width: 200,
      },
      {
        field: 'start_date',
        headerText: 'Start',
        textAlign: eAlign.Right,
        format: 'dd-MM-yyyy',
        width: 150,
      },
      {
        field: 'end_date',
        headerText: 'End',
        textAlign: eAlign.Right,
        format: 'dd-MM-yyyy',
        width: 150,
      },
      {
        field: 'dev_effort_days',
        headerText: 'Duration (days)',
        textAlign: eAlign.Right,
        width: 80,
      },
    ]
    this.sortSettings = { columns: [{ field: 'id', direction: 'Descending' }] };
    this.searchSettings = { fields: ['code', 'project_name', 'leader_fullname', 'client_name'], operator: 'contains', key: '', ignoreCase: true };

  }

}
