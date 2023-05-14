import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CoreService } from 'src/app/_services/core.service';

import { TlaSharedModule } from 'src/app/components/shared.module';
import { FunctionComponent } from './function.component';
import { FunctionEditComponent } from './edit/function-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FunctionComponent
  },{
    path: ':id',
    component: FunctionEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule
  ],
  declarations: [FunctionComponent, FunctionEditComponent],
  providers: [CoreService]
})
export class FunctionModule {}
