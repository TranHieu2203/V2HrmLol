import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { ProjectManagerService } from '../project-manager.service';

@Component({
  selector: 'app-project-manager-center',
  templateUrl: './project-manager-center.component.html',
  styleUrls: ['./project-manager-center.component.css']
})
export class ProjectManagerCenterComponent implements OnInit, AfterViewInit {

  @ViewChild('projectcenter') projectcenter!: ElementRef;

  constructor(private projectManagerService: ProjectManagerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.projectManagerService.centerOffsetTop.next(this.projectcenter.nativeElement.getBoundingClientRect().top);
  }

}
