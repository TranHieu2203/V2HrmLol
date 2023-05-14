import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SalaryScaleComponent } from "./salaryscale.component";
import { CoreService } from "src/app/_services/core.service";
import { SalaryScaleEditComponent } from "./edit/salaryscale-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";

const routes: Routes = [
  {
    path: "",
    component: SalaryScaleComponent,
  },
  {
    path: ":id",
    component: SalaryScaleEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule],
  declarations: [SalaryScaleComponent, SalaryScaleEditComponent],
  providers: [CoreService],
})
export class SalaryScaleModule {}
