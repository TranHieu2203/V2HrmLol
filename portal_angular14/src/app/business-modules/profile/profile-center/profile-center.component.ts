import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts } from '@angular/router';

import { employeeAnimation } from '../animations';

@Component({
  selector: 'app-profile-center',
  templateUrl: './profile-center.component.html',
  styleUrls: ['./profile-center.component.css'],
  animations: [employeeAnimation]
})
export class ProfileCenterComponent implements OnInit {

  constructor(
    private contexts: ChildrenOutletContexts,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
