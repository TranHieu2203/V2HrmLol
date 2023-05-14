import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SymbolComponent } from './symbol.component';
import { CoreService } from 'src/app/_services/core.service';
import { SymbolEditComponent } from './edit/symbol-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SymbolComponent
  },{
    path: ':id',
    component: SymbolEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule
  ],
  declarations: [SymbolComponent, SymbolEditComponent],
  providers: [CoreService]
})
export class SymbolModule {}
