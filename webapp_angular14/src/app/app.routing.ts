import {
  StoreGuard,
  AdminGuard,
} from "./common/auth.guard";
import { Routes } from "@angular/router";

import { Error404Component } from "./main/errors/404/error-404.component";
import { ModulesComponent } from './components/modules/modules.component';

export const AppRoutes: Routes = [
  {
    path: "auth",
    children: [
      {
        path: "",
        //loadChildren: "./auth/auth.module#AuthModule"
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
      },
    ],
  },
  {
    path: 'modules',
    component: ModulesComponent,
    outlet: 'ppMain'
  },
  {
    path: "sys",
    children: [
      {
        path: "",
        //loadChildren: "./main/system/system.module#SystemModule",
        loadChildren: () => import("./main/system/system.module").then(m => m.SystemModule),
      },
    ],
    canActivate: [AdminGuard],
  },
  {
    path: "cms",
    children: [
      {
        path: "",
        //loadChildren: "./main/cms/cms.module#CmsModule",
        loadChildren: () => import("./main/cms/cms.module").then(m => m.CmsModule),
      },
    ],
    canActivate: [StoreGuard],
  },
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: "full",
  },
  {
    path: "**",
    component: Error404Component,
  },
];
