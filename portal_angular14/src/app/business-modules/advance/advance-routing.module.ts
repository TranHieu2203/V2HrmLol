import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';

import { AdvanceCenterComponent } from './advance-center/advance-center.component';
import { AdvanceDashboardComponent } from './advance-dashboard/advance-dashboard.component';
import { SupportComponent } from './support/support.component';
import { MarketComponent } from './market/market.component';
import { ReportComponent } from './report/report.component';
import { AutomationComponent } from './automation/automation.component';
import { OpenApiComponent } from './open-api/open-api.component';
import { CloudsComponent } from './clouds/clouds.component';

const advanceRoutes: Routes = [
  {
    path: '',
    component: AdvanceCenterComponent,
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
            component: AdvanceDashboardComponent,
          },
          {
            path: 'support',
            component: SupportComponent,
          },
          {
            path: 'market',
            component: MarketComponent,
          },
          {
            path: 'report',
            component: ReportComponent,
          },
          {
            path: 'automation',
            component: AutomationComponent,
          },
          {
            path: 'openapi',
            component: OpenApiComponent,
          },
          {
            path: 'cloud',
            component: CloudsComponent,
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
  imports: [RouterModule.forChild(advanceRoutes)],
  exports: [RouterModule]
})
export class AdvanceRoutingModule { }
