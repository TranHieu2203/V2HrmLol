import { Component, OnInit, ViewEncapsulation } from '@angular/core';

interface ITotalOverviewItem {
  name: string;
  iconPath: string,
  total: number;
  bgColor: string;
}


@Component({
  selector: 'app-total-overview',
  templateUrl: './total-overview.component.html',
  styleUrls: ['./total-overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TotalOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  totalOverviewList: ITotalOverviewItem[] = [
    {
      name: 'Waiting Approval',
      iconPath: 'assets/images/calendar.svg',
      total: 3,
      bgColor: '#FBEDD9',
    },
    {
      name: 'Total Projects',
      iconPath: 'assets/images/bar-card.svg',
      total: 10,
      bgColor: '#D6FFD8',
    },
    {
      name: 'Total Clients',
      iconPath: 'assets/images/users.svg',
      total: 15,
      bgColor: '#DFEDF7',
    },
    {
      name: 'Total Coures',
      iconPath: 'assets/images/education.svg',
      total: 4,
      bgColor: '#F9E5EA',
    },
  ];

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: false,
    nextArrow: false,
  };

}
