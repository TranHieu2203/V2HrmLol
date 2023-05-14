import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContractTypeComponent } from "./contracttype.component";
import { CoreService } from "src/app/_services/core.service";
import { ContractTypeEditComponent } from "./edit/contracttype-edit.component";
import { TlaSharedModule } from "src/app/components/shared.module";

const routes: Routes = [
  {
    path: "",
    component: ContractTypeComponent,
  },
  {
    path: ":id",
    component: ContractTypeEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TlaSharedModule],
  declarations: [ContractTypeComponent, ContractTypeEditComponent],
  providers: [CoreService],
})
export class ContractTypeModule {}
