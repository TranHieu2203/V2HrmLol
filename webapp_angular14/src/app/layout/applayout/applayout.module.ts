import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppLayoutCompnent } from './applayout.component';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { TanleicaLibModule } from 'tanleica-lib'

@NgModule({
    declarations: [
        AppLayoutCompnent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        ToolbarModule,
        SidebarModule,
        TanleicaLibModule,
    ],
    exports: [
        AppLayoutCompnent,
    ]
})
export class AppLayoutModule {}
