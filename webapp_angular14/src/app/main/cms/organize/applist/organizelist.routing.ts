import { Routes } from "@angular/router";

export const OrganizeListRoutes: Routes = [
  {
    path: "",
    redirectTo: "/cms/organize/list/job-band",
    pathMatch: "full",
  },
  {
    path: "job-band",
    //loadChildren: "./job-band/job-band.module#JobBandModule",
    loadChildren: () => import("./job-band/job-band.module").then(m => m.JobBandModule),
  },
  {
    path: "companyinfo",
    //loadChildren: "./companyinfo/companyinfo.module#CompanyInfoModule",
    loadChildren: () => import("./companyinfo/companyinfo.module").then(m => m.CompanyInfoModule),
  },
  {
    path: "",
    redirectTo: "/cms/organize/list/companyinfo",
    pathMatch: "full",
  },
];
