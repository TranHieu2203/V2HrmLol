import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module';
import { LibrariesModule } from 'src/app/libraries.module';

import { LearnrxjsRoutingModule } from './learnrxjs-routing.module';
import { LearnrxjsCenterComponent } from './learnrxjs-center/learnrxjs-center.component';
import { IntroductionComponent } from './introduction/introduction.component';


@NgModule({
  declarations: [
    LearnrxjsCenterComponent,
    IntroductionComponent
  ],
  imports: [
    CommonModule,
    LearnrxjsRoutingModule,
    SharedModule,
    LibrariesModule,
  ]
})
export class LearnrxjsModule { }
