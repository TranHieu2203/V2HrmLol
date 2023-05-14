import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of, map, first } from 'rxjs';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IntroductionComponent implements OnInit {

  observable!: Observable<any>;

  constructor() { }

  ngOnInit(): void {


    this.observable = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 5000);
    });

  }

  clickObservable() {
    console.log('just before subscribe');
    this.observable.subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
    console.log('just after subscribe');
  }

  clickOperators() {

    of(1, 2, 3)
      .pipe(
        map((x) =>  x * x),
        //first(),
      )
      .subscribe((v) => setTimeout(() => console.log(`value: ${v}`), v*1000));
  }

}
