import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';

import { WorkplaceCenterComponent } from './workplace-center/workplace-center.component';
import { WorkplaceDashboardComponent } from './workplace-dashboard/workplace-dashboard.component';
import { ArchiveComponent } from './archive/archive.component';
import { WorkComponent } from './work/work.component';
import { ProcessComponent } from './process/process.component';
import { DocumentComponent } from './document/document.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ESignComponent } from './esign/esign.component';

const workplaceRoutes: Routes = [
  {
    path: '',
    component:   WorkplaceCenterComponent,
    canActivate: [AuthGuard],
    resolve: {
      //somedata: WorkplaceCenterResolverService
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'dashboard',
            component: WorkplaceDashboardComponent,
          },
          {
            path: 'archive',
            component: ArchiveComponent,
          },
          {
            path: 'work',
            component: WorkComponent,
          },
          {
            path: 'process',
            component: ProcessComponent,
          },
          {
            path: 'document',
            component: DocumentComponent,
          },
          {
            path: 'schedule',
            component: ScheduleComponent,
          },
          {
            path: 'esign',
            component: ESignComponent,
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
  imports: [RouterModule.forChild(workplaceRoutes)],
  exports: [RouterModule]
})
export class WorkplaceRoutingModule { }
