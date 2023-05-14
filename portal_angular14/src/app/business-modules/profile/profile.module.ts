import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';
import { SyncfusionModule } from 'src/app/syncfusion.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { LibrariesModule } from 'src/app/libraries.module';

import { ProfileCenterComponent } from './profile-center/profile-center.component';
import { EmployeesComponent } from './employee/employees/employees.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeesSfComponent } from './employee/employees-sf/employees-sf.component';


@NgModule({
  declarations: [
    ProfileCenterComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    EmployeesSfComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LibrariesModule,
    SyncfusionModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
