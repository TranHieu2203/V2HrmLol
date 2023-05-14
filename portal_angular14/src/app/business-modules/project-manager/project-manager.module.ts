import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { SyncfusionModule } from 'src/app/syncfusion.module';
import { LibrariesModule } from 'src/app/libraries.module';

import { ProjectManagerRoutingModule } from './project-manager-routing.module';
import { ProjectManagerCenterComponent } from './project-manager-center/project-manager-center.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';

@NgModule({
  declarations: [
    ProjectManagerCenterComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LibrariesModule,
    SyncfusionModule,
    ProjectManagerRoutingModule
  ]
})
export class ProjectManagerModule { }
