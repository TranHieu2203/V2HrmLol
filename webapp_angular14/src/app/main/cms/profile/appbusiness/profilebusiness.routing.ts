import { Routes } from "@angular/router";
import { TenantPermisstionGuard } from "src/app/common/auth.guard";

export const ProfileBusinessRoutes: Routes = [
  {
    path: "",
    redirectTo: "/cms/profile/business/inschange",
    pathMatch: "full",
  },
  {
    path: "staffprofile",
    //loadChildren: "./staffprofile/staffprofile.module#StaffProfileModule",
    loadChildren: () => import("./staffprofile/staffprofile.module").then(m => m.StaffProfileModule),
    //canActivate: [TenantPermisstionGuard]
  },
  {
    path: "contractinfor",
    //loadChildren: "./contractinfor/contractinfor.module#ContractInforModule",
    loadChildren: () => import("./contractinfor/contractinfor.module").then(m => m.ContractInforModule),
  },
  {
    path: "decision",
    //loadChildren: "./decision/decision.module#DecisionModule",
    loadChildren: () => import("./decision/decision.module").then(m => m.DecisionModule),
  },
  {
    path: "commend",
    //loadChildren: "./commend/commend.module#CommendModule",
    loadChildren: () => import("./commend/commend.module").then(m => m.CommendModule),
  },
  {
    path: "discipline",
    //loadChildren: "./discipline/discipline.module#DisciplineModule",
    loadChildren: () => import("./discipline/discipline.module").then(m => m.DisciplineModule),
  },
  {
    path: "leavejob",
    //loadChildren: "./leavejob/leavejob.module#LeaveJobModule",
    loadChildren: () => import("./leavejob/leavejob.module").then(m => m.LeaveJobModule),
  },
  {
    path: "inschange",
    //loadChildren: "./inschange/inschange.module#InsChangeModule",
    loadChildren: () => import("./inschange/inschange.module").then(m => m.InsChangeModule),
  },
  {
    path: "insinformation",
    //loadChildren: "./insinformation/insinformation.module#InsInformationModule",
    loadChildren: () => import("./insinformation/insinformation.module").then(m => m.InsInformationModule),
  },
  {
    path: "staffprofile-change",
    //loadChildren:      "./staffprofile-change/staffprofile-change.module#StaffProfileChangeModule",
    loadChildren: () => import("./staffprofile-change/staffprofile-change.module").then(m => m.StaffProfileChangeModule),
  },
  {
    path: "family-change",
    //loadChildren: "./family-change/family-change.module#FamilyChangeModule",
    loadChildren: () => import("./family-change/family-change.module").then(m => m.FamilyChangeModule),
  },
  // {
  //   path: "angular-tree-grid",
  //   //loadChildren:
  //     "./angular-tree-grid/angular-tree-grid.module#AngularTreeGridModule",
  // },
  {
    path: "candidatescancv",
    //loadChildren: "./candidatescancv/candidatescancv.module#CandidatescancvModule",
    loadChildren: () => import("./candidatescancv/candidatescancv.module").then(m => m.CandidatescancvModule),
  },
];
