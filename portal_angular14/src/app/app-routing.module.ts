import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModulesComponent } from './components/modules/modules.component';
import { PopupDeveloperComponent } from './components/popup-developer/popup-developer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { BadgeComponent } from './components/badge/badge.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DeveloperComponent } from './components/developer/developer.component';
import { SmartTableComponent } from './libraries/smart-table/smart-table.component';

import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

import { AuthGuard } from './guards/auth.guard';
import { MccDemoComponent } from './demo/mcc-demo/mcc-demo.component';

import { WaittingScreenComponent } from './libraries/waitting-screen/waitting-screen.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test',
    component: WaittingScreenComponent,
  },
  {
    path: 'developer',
    component: DeveloperComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accountinformation',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'defaultbadge',
    component: BadgeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'defaultsettings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'defaultmessage',
    component: PopupDeveloperComponent,
    outlet: 'developer'
  },
  {
    path: 'modules',
    component: ModulesComponent,
    canActivate: [AuthGuard],
    outlet: 'ppMain'
  },
  {
    path: 'learnrxjs',
    loadChildren: () => import('./business-modules/learnrxjs/learnrxjs.module').then(m => m.LearnrxjsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'account-center',
    loadChildren: () => import('./business-modules/account/account.module').then(m => m.AccountModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'workplace-center',
    loadChildren: () => import('./business-modules/workplace/workplace.module').then(m => m.WorkplaceModule),
    data: { preload: true },
    canLoad: [AuthGuard],
  },
  {
    path: 'hrm-center',
    loadChildren: () => import('./business-modules/hrm/hrm.module').then(m => m.HrmModule),
    data: { preload: true },
    canLoad: [AuthGuard],
  },
  {
    path: 'crm-center',
    loadChildren: () => import('./business-modules/crm/crm.module').then(m => m.CrmModule),
    data: { preload: true },
    canLoad: [AuthGuard],
  },
  {
    path: 'advance-center',
    loadChildren: () => import('./business-modules/advance/advance.module').then(m => m.AdvanceModule),
    data: { preload: true },
    canLoad: [AuthGuard],
  },
  {
    path: 'project-manager-center',
    loadChildren: () => import('./business-modules/project-manager/project-manager.module').then(m => m.ProjectManagerModule),
    data: { preload: true },
    canLoad: [AuthGuard],
  },
  {
    path: 'article-center',
    loadChildren: () => import('./business-modules/article/article.module').then(m => m.ArticleModule),
    data: { preload: true },
    canLoad: [AuthGuard],
  },
  {
    path: 'profile-center',
    loadChildren: () => import('./business-modules/profile/profile.module').then(m => m.ProfileModule),
    data: { preload: true }
    //canLoad: [AuthGuard],
  },
  {
    path: 'smart-table',
    component: SmartTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mcc-demo',
    component: MccDemoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      // enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategyService,
    }
  )],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule { }
