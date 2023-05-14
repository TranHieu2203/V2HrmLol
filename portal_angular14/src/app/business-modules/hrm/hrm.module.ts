import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from 'src/app/directives.module';

import { HrmRoutingModule } from './hrm-routing.module';
import { HrmDashboardComponent } from './hrm-dashboard/hrm-dashboard.component';
import { HrmCenterComponent } from './hrm-center/hrm-center.component';
import { ApplicationComponent } from './application/application.component';
import { AssetComponent } from './asset/asset.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { TimecheckComponent } from './timecheck/timecheck.component';
import { PayrollComponent } from './payroll/payroll.component';
import { KpiComponent } from './kpi/kpi.component';
import { TrainingComponent } from './training/training.component';


@NgModule({
  declarations: [
    HrmDashboardComponent,
    HrmCenterComponent,
    ApplicationComponent,
    AssetComponent,
    RecruitmentComponent,
    PersonnelComponent,
    TimecheckComponent,
    PayrollComponent,
    KpiComponent,
    TrainingComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    HrmRoutingModule
  ]
})
export class HrmModule { }
