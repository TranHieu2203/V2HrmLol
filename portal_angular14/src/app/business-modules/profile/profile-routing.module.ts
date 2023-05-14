import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';
import { EmployeeEditResolverService } from './employee/employee-edit-resolver.service';

import { ProfileCenterComponent } from './profile-center/profile-center.component';
import { EmployeesComponent } from './employee/employees/employees.component';
import { EmployeesSfComponent } from './employee/employees-sf/employees-sf.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileCenterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { 
            path: 'employees',
            component: EmployeesComponent,
            data: { animation: 'employees' },
          },
          { 
            path: 'employees-sf',
            component: EmployeesSfComponent,
            data: { animation: 'employees' },
          },
          {
            path: 'employee/:id',
            component: EmployeeDetailComponent,
            data: { animation: 'employee' },
          },
          {
            path: 'employee-edit/:id',
            component: EmployeeEditComponent,
            canDeactivate: [CanDeactivateGuard],
            data: { animation: 'employee' },
            resolve: {
              employee: EmployeeEditResolverService
            }
          },
          { 
            path: '',
            redirectTo: 'employees',
            pathMatch: 'full',
          },
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
