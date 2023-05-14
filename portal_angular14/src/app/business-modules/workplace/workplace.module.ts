import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariesModule } from 'src/app/libraries.module';
import { DirectivesModule } from 'src/app/directives.module';

import { WorkplaceRoutingModule } from './workplace-routing.module';
import { WorkplaceCenterComponent } from './workplace-center/workplace-center.component';
import { DocumentComponent } from './document/document.component';
import { ProcessComponent } from './process/process.component';
import { ArchiveComponent } from './archive/archive.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ESignComponent } from './esign/esign.component';
import { WorkComponent } from './work/work.component';
import { WorkplaceDashboardComponent } from './workplace-dashboard/workplace-dashboard.component';

@NgModule({
  declarations: [
    WorkplaceCenterComponent,
    DocumentComponent,
    ProcessComponent,
    ArchiveComponent,
    ScheduleComponent,
    ESignComponent,
    WorkComponent,
    WorkplaceDashboardComponent
  ],
  imports: [
    CommonModule,
    LibrariesModule,
    DirectivesModule,
    WorkplaceRoutingModule
  ]
})
export class WorkplaceModule { }
