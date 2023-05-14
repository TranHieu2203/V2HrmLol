import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ISmartTableColumn, ISmartTableInput } from 'src/app/libraries/smart-table/smart-table-input';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  rendered: boolean = false;

  loading = new BehaviorSubject<boolean>(false)

  selectedItem = new BehaviorSubject<any>(null);

  currentPage = new BehaviorSubject<number>(1);
  pageSize = new BehaviorSubject<number>(10);
  keyword = new BehaviorSubject<string>('');
  columns = new BehaviorSubject<ISmartTableColumn[]>([
    {
      header: "ID",
      accessor: "id",
      left: 0,
      width: 80,
    },
    {
      header: "Mã NV",
      accessor: "employee_code",
      type: 'string',
      left: 80,
      width: 120,
    },
    {
      header: "Họ và tên",
      accessor: "fullname_vn",
      type: 'string',
      left: 200,
      width: 120,
    },
    {
      header: "Fullname",
      accessor: "fullname_en",
      type: 'string',
    },
    {
      header: "Ngày vào",
      accessor: "join_date",
      type: 'date',
    },
    {
      header: "Phòng ban",
      accessor: "org_name_vn",
      type: 'string',
    },
    {
      header: "Org. unit",
      accessor: "org_name_en",
      type: 'string',
    },
    {
      header: "Trạng thái",
      accessor: "work_status",
      type: 'number',
    },
    {
      header: "Công việc",
      accessor: "job_name_vn",
      type: 'string',
    },
    {
      header: "Job",
      accessor: "job_name_en",
      type: 'string',
    },
    {
      header: "Mã chấm công",
      accessor: "itime_id",
      type: 'number',
    },
  ]);

  pageSizeOption: number[] = [5, 10, 20, 50, 100];
  pageCount: number = 0;
  totalRow: number = 0;

  inputData = new BehaviorSubject<ISmartTableInput | null>({
    columns: this.columns.value,
    primaryKey: "id",
    data: {
      count: 0,
      result: [],
    },
    frozenColumnCount: 3,
    cellPadding: '4px 5px',
  });

  onCurrentPageChanged = (value: number) => this.currentPage.next(value);

  onPageSizeChanged = (value: number) => this.pageSize.next(value);

  onColumnsChanged = (value: ISmartTableColumn[]) => this.columns.next(value);

  constructor(private employeeService: EmployeeService) {
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

  refreshList() {
    this.loading.next(true);
    console.log(this.columns.value);
    
    this.employeeService.getEmployees(this.currentPage.value, this.pageSize.value, this.keyword.value, this.columns.value)
      .subscribe(x => {
        console.log("IHttpResponseCore2021: ", x)
        this.loading.next(false);
        if (x.ok && x.status === 200) {
          if (x.body.code === "200") {
            this.inputData.next({
              columns: this.columns.value,
              primaryKey: "id",
              data: {
                count: x.body.data.total_row,
                result: x.body.data.list_data,
              },
              frozenColumnCount: 3,
              cellPadding: '4px 5px',
            })
          }
        }
      })

  }

}
