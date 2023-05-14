import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AllowanceComponent } from "./allowance.component";
import { CoreService } from "src/app/_services/core.service";
import { AllowanceEditComponent } from "./edit/allowance-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";

const routes: Routes = [
  {
    path: "",
    component: AllowanceComponent,
  },
  {
    path: ":id",
    component: AllowanceEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule],
  declarations: [AllowanceComponent, AllowanceEditComponent],
  providers: [CoreService],
})
export class AllowanceModule {}
