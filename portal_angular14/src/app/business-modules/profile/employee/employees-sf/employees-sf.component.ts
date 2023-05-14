import { Component, OnInit } from '@angular/core';

import { DataManager } from '@syncfusion/ej2-data';
import { SortSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';

import { ISfGridColumn } from 'src/app/libraries/sf-grid/sf-grid-column';
import { eAlign, eColumnType } from 'src/app/libraries/sf-grid/sf-grid-column';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employees-sf',
  templateUrl: './employees-sf.component.html',
  styleUrls: ['./employees-sf.component.css']
})
export class EmployeesSfComponent implements OnInit {

  data!: DataManager;
  sortSettings!: SortSettingsModel;
  searchSettings!: SearchSettingsModel;
  columns!: ISfGridColumn[];
  apiListFullUrl!: string;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.columns = [
      {
        field: "id",
        isPrimaryKey: "true",
        headerText: "ID",
        textAlign: eAlign.Right,
        width: 100,
      },
      {
        field: "employee_code",
        headerText: "Mã NV",
        textAlign: eAlign.Left,
        width: 200,
      },
      {
        field: "fullname_vn",
        headerText: "Họ và tên",
        textAlign: eAlign.Left,
        width: 300,
      },
      {
        field: "fullname_en",
        headerText: "Fullname",
        textAlign: eAlign.Left,
        width: 300,
      },
      {
        field: "join_date",
        headerText: "Ngày vào",
        textAlign: eAlign.Right,
        type: eColumnType.datetime,
        format: 'dd-MM-yyyy',
        width: 150,
      },
      {
        field: "org_name_vn",
        headerText: "Phòng ban",
        textAlign: eAlign.Left,
        width: 300,
      },
      {
        field: "org_name_en",
        headerText: "Organization unit",
        textAlign: eAlign.Left,
        width: 300,
      },
      {
        field: "work_status",
        headerText: "Trạng thái",
        type: eColumnType.number,
        textAlign: eAlign.Right,
        width: 120,
      },
      {
        field: "job_name_vn",
        headerText: "Công việc",
        textAlign: eAlign.Left,
        width: 300,
      },
      {
        field: "job_name_en",
        headerText: "Job",
        textAlign: eAlign.Left,
        width: 300,
      },
      {
        field: "itime_id",
        headerText: "Mã chấm công",
        textAlign: eAlign.Right,
        width: 120,
      },
    ]
    this.sortSettings = { columns: [{ field: 'id', direction: 'Descending' }] };
    this.searchSettings = { 
      fields: ['employee_code', 'fullname_vn', 'fullname_en', 'job_name_vn', 'job_name_en'], 
      operator: 'contains', key: '', ignoreCase: true };
    this.apiListFullUrl = this.authService.serverModel.getEmployeesUrl!;
  }

}
