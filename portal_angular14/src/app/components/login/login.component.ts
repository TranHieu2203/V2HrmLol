import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { RandomImageService } from 'src/app/services/random-image.service';

import { HISTAFF2022, SERVER0, SERVER1, SERVER2, SERVER3, SERVER4 } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('remember') remember!: ElementRef;

  authForm: FormGroup;
  loading = false;
  backgroundImage?: string;
  values: any = {
    user_name: "",
    password: ""
  }
  jsonValues: string = "";
  authenticated!: boolean;
  server!: string;

  constructor(
    public authService: AuthService,
    private randomImageService: RandomImageService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

    let remember: boolean = true;

    if (localStorage) {
      const lsRemember = localStorage.getItem('remember');
      if (lsRemember) remember = JSON.parse(lsRemember);
    }

    this.authForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      remember: [remember]
    });
  }

  req: any;
  randomImageServiceSubscription!: Subscription;
  authServiceLogoutSubscription!: Subscription;

  ngOnInit(): void {
    this.server = this.authService.serverModel.modelName;
    this.randomImageServiceSubscription = this.randomImageService.get().subscribe(x => this.backgroundImage = x.src);

    /*
    this.authServiceLogoutSubscription = this.authService.logout(false).subscribe(() => {
      console.log("this.authService.authenticated$.value", this.authService.authenticated$.value)
      this.authService.authenticated$.next(false);
      this.req = this.authService.logIn({
        ...this.authForm.value,
        username: this.authForm.value.user_name,
        email: this.authForm.value.user_name,
        rememberme: this.authForm.value.remember
      })
    });
    */
  }

  ngAfterViewInit(): void {
      this.remember.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.randomImageServiceSubscription) this.randomImageServiceSubscription.unsubscribe();
    if (this.authServiceLogoutSubscription) this.authServiceLogoutSubscription.unsubscribe();
  }

  get formControls() { return this.authForm.controls; }

  onServerChanged(e: any) {
    if (e.target.value === '0') this.authService.serverModel = HISTAFF2022;
    if (e.target.value === '1') this.authService.serverModel = SERVER0;
    if (e.target.value === '2') this.authService.serverModel = SERVER1;
    if (e.target.value === '3') this.authService.serverModel = SERVER2;
    if (e.target.value === '4') this.authService.serverModel = SERVER3;
    if (e.target.value === '5') this.authService.serverModel = SERVER4;
  }

  signIn() {
    if (this.authForm.invalid) {
      return;
    }
    this.req = this.authService.logIn({
      ...this.authForm.value,
      username: this.authForm.value.user_name,
      email: this.authForm.value.user_name,
      rememberme: this.authForm.value.remember
    })
    this.loading = true;
    this.req
      .subscribe(
        (response: any) => {
          this.loading = false;

          if (localStorage) {
            localStorage.setItem('remember', this.authForm.value.remember);
          }

          console.log("RESPONSE", response)

          if (response.ok && response.status === 200) {

            console.log(response)

            switch (this.authService.serverModel.modelName) {

              case SERVER0.modelName:
              case SERVER1.modelName:
              case SERVER2.modelName:
                this.authService.auth.data = response.body.data;
                this.authService.authenticated$.next(true);

                this.router.navigateByUrl('');
                break;
              
              case SERVER3.modelName:
              case SERVER4.modelName:
                this.authService.auth.data = response.body;
                this.authService.authenticated$.next(true);

                this.router.navigateByUrl('');
                break;
              default:
                console.log("default:", response)
                this.authService.auth.data = response.body.data;
                this.authService.authenticated$.next(true);

                !!localStorage && !!localStorage.getItem('token') 
                && localStorage.setItem('token', response.body.data.refreshToken.token);

                this.router.navigateByUrl('');

            }
          } else {
            console.log('signInResponse not ok and not 200: ', response);
          }
        },
        (error: any) => {
          console.log('signIn error: ', error)
        }
      );
  }

  isDirty() {
    return this.authForm.dirty;
  }

}
