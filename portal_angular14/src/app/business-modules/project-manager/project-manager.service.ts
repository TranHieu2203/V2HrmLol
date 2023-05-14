import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  centerOffsetTop = new BehaviorSubject<number>(0);
  overviewOffsetTop = new BehaviorSubject<number>(0);

  constructor() { }

}
