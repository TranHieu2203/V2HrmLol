import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { RandomImageService } from 'src/app/services/random-image.service';

@Component({
  selector: 'app-hrm-center',
  templateUrl: './hrm-center.component.html',
  styleUrls: ['./hrm-center.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HrmCenterComponent implements OnInit, OnDestroy {

  childRouteUrl!: string;
  backgroundImage!: string;
  backgroundImageCaption!: string;
  randomImageServiceSubscription!: Subscription;

  constructor(private router: Router, private randomImageService: RandomImageService) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.childRouteUrl = e.urlAfterRedirects.split('/')[2];
      }
    })
  }

  ngOnInit(): void {
    this.randomImageServiceSubscription = this.randomImageService.get().subscribe(x => {
      this.backgroundImage = x.src;
      this.backgroundImageCaption = x.caption;
    });
  }

  ngOnDestroy(): void {
    this.randomImageServiceSubscription.unsubscribe();
  }

}