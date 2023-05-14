import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CommonHttpRequestService } from 'src/app/services/common-http-request.service';
import { AuthService } from 'src/app/services/auth.service';

import { ISmartTableColumn } from 'src/app/libraries/smart-table/smart-table-input';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private commonHttpRequestService: CommonHttpRequestService, private authService: AuthService) { }

  getEmployees(currentPage: number, pageSize: number, keyword: string, columns: ISmartTableColumn[]): Observable<any> {
    console.log("getEmployees columns", columns)
    return this.commonHttpRequestService.makePostRequest(
      'getEmployees',
      this.authService.serverModel.getEmployeesUrl!,
      {
        current_page: currentPage,
        page_size: pageSize,
        keyword,
        columns: JSON.stringify(columns!)
      }
      )
  }

  getEmployee(id: number): Observable<any> {
    return of({
      id: id,
      fullname: 'Some one'
    })
  }
}
