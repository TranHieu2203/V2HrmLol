import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobBandComponent } from './job-band.component';
import { CoreService } from 'src/app/_services/core.service';
import { JobBandEditComponent } from './edit/job-band-edit.component';
import { TlaSharedModule } from 'src/app/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: JobBandComponent
  },
  {
    path: ':id',
    component: JobBandEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TlaSharedModule
  ],
  declarations: [JobBandComponent, JobBandEditComponent],
  providers: [CoreService]
})
export class JobBandModule {}
