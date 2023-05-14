import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DirectiveModule } from "./directives/directive.module";
import { HttpClientModule as HttpModule } from "@angular/common/http"; 
import { Router, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminGuard, StoreGuard } from "./common/auth.guard";
import { AppRoutes } from "./app.routing";
import { Globals } from "./common/globals";
import { Configs } from "./common/configs";
import { AuthService } from "./common/auth.service";
import { Notification } from "./common/notification";
import { ToastyModule } from "ng2-toasty";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./common/token.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Error404Module } from "./main/errors/404/error-404.module";
import { AppLayoutModule } from "./layout/applayout/applayout.module";
import { ConfigTreeGrids } from "./common/configs_treegrid";

import { LibrariesModule } from "./libraries/libraries.module"
// import { TanLibraryModule } from 'tan-library';

import { AppComponent } from "./app.component";
import { ModulesComponent } from "./components/modules/modules.component";
import { WaittingScreenComponent } from "./components/waitting-screen/waitting-screen.component";
import { HeaderComponent } from './components/header/header.component';
import { RightchatComponent } from './components/rightchat/rightchat.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    LibrariesModule,
    ModalModule,
    DirectiveModule,
    RouterModule.forRoot(AppRoutes),
    TranslateModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    HttpModule,
    // Common Module
    Error404Module,
    AppLayoutModule,
    // TanLibraryModule,
  ],
  declarations: [
    AppComponent,
    ModulesComponent,
    WaittingScreenComponent,
    HeaderComponent,
    RightchatComponent,
    FooterComponent,
  ],
  providers: [
    AuthService,
    AdminGuard,
    StoreGuard,
    Globals,
    Configs,
    ConfigTreeGrids,
    BsModalService,
    Notification,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(router: Router) {
        // Use a custom replacer to display function names in the route configs
        const replacer = (key: string, value: any) => (typeof value === 'function') ? value.name : value;

        console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
        //console.log('Routes: ', router.config, replacer, 2);
  }

}
