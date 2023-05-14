import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEditResolverService implements Resolve<any> {

  constructor(private employeeService: EmployeeService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    const id = Number(route.paramMap.get('id'))!;

    return this.employeeService.getEmployee(id).pipe(
      mergeMap(mergeMapResponse => {
        if (mergeMapResponse) {
          return of(mergeMapResponse.body);
        } else { // id not found
          this.router.navigate(['/employee-center']);
          return EMPTY;
        }
      })
    );
  }
}
