import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';

import { HrmCenterComponent } from './hrm-center/hrm-center.component';
import { HrmDashboardComponent } from './hrm-dashboard/hrm-dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { AssetComponent } from './asset/asset.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { TimecheckComponent } from './timecheck/timecheck.component';
import { PayrollComponent } from './payroll/payroll.component';
import { KpiComponent } from './kpi/kpi.component';
import { TrainingComponent } from './training/training.component';

const hrmRoutes: Routes = [
  {
    path: '',
    component: HrmCenterComponent,
    canActivate: [AuthGuard],
    resolve: {
      //somedata: 
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'dashboard',
            component: HrmDashboardComponent,
          },
          {
            path: 'application',
            component: ApplicationComponent,
          },
          {
            path: 'asset',
            component: AssetComponent,
          },
          {
            path: 'recruitment',
            component: RecruitmentComponent,
          },
          {
            path: 'personnel',
            component: PersonnelComponent,
          },
          {
            path: 'timecheck',
            component: TimecheckComponent,
          },
          {
            path: 'payroll',
            component: PayrollComponent,
          },
          {
            path: 'kpi',
            component: KpiComponent,
          },
          {
            path: 'training',
            component: TrainingComponent,
          },
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(hrmRoutes)],
  exports: [RouterModule]
})
export class HrmRoutingModule { }
