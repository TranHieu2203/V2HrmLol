import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LearnrxjsCenterComponent } from './learnrxjs-center/learnrxjs-center.component';
import { IntroductionComponent } from './introduction/introduction.component';

import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LearnrxjsCenterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'introduction',
            component: IntroductionComponent,
          },
          {
            path: '',
            redirectTo: 'introduction',
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
export class LearnrxjsRoutingModule { }
