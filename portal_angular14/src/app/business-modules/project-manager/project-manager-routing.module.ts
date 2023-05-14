import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectManagerCenterComponent } from './project-manager-center/project-manager-center.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { CanDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: ProjectManagerCenterComponent,
    canActivate: [AuthGuard],
    // resolve: {
    //   someProp: SomeResolverService
    // },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { 
            path: 'projects-overview',
            component: ProjectOverviewComponent,
            data: { animation: 'projects' },
          },
          { 
            path: 'projects',
            component: ProjectsComponent,
            data: { animation: 'projects' },
          },
          {
            path: 'project/:id',
            component: ProjectDetailComponent,
            data: { animation: 'project' },
          },
          {
            path: 'project-edit/:id',
            component: ProjectEditComponent,
            canDeactivate: [CanDeactivateGuard],
            data: { animation: 'project' },
            // resolve: {
            //   someProp: SomeResolverService
            // },
          },
          { 
            path: '',
            redirectTo: 'projects-overview',
            pathMatch: 'full',
          },
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagerRoutingModule { }
