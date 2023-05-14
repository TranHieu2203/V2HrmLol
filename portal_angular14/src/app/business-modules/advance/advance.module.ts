import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from 'src/app/directives.module';

import { AdvanceRoutingModule } from './advance-routing.module';
import { AdvanceCenterComponent } from './advance-center/advance-center.component';
import { AdvanceDashboardComponent } from './advance-dashboard/advance-dashboard.component';
import { SupportComponent } from './support/support.component';
import { MarketComponent } from './market/market.component';
import { ReportComponent } from './report/report.component';
import { AutomationComponent } from './automation/automation.component';
import { OpenApiComponent } from './open-api/open-api.component';
import { CloudsComponent } from './clouds/clouds.component';


@NgModule({
  declarations: [
    AdvanceCenterComponent,
    AdvanceDashboardComponent,
    SupportComponent,
    MarketComponent,
    ReportComponent,
    AutomationComponent,
    OpenApiComponent,
    CloudsComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    AdvanceRoutingModule
  ]
})
export class AdvanceModule { }
