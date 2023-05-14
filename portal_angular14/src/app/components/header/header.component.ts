import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { HeaderService } from 'src/app/services/header.service';
import { ArticleService } from 'src/app/business-modules/article/article.service';
import { IArticles } from 'src/app/business-modules/article/articles';
import { IArticlesRequest } from 'src/app/business-modules/article/articles-request';
import { ITaskCard } from '../task-card/task-card.component';
import { Subscription } from 'rxjs';

import { ModulesService } from 'src/app/services/modules.service';

import { IModule } from 'src/app/components/modules/modules.component';

const moduleRouterLink = [{ outlets: { ppMain: ['modules'] } }]

const colors: string[][] = [
  ['bg-red-gradiant-1', 'bg-red-gradiant-2', 'bg-red-gradiant-3', 'bg-red-gradiant-4'],
  ['bg-green-gradiant-1', 'bg-green-gradiant-2', 'bg-green-gradiant-3', 'bg-green-gradiant-4'],
  ['bg-yellow-gradiant-1', 'bg-yellow-gradiant-2', 'bg-yellow-gradiant-3', 'bg-yellow-gradiant-4'],
  ['bg-blue-gradiant-1', 'bg-blue-gradiant-2', 'bg-blue-gradiant-3', 'bg-blue-gradiant-4'],
  ['bg-red-gradiant-1', 'bg-red-gradiant-2', 'bg-red-gradiant-3', 'bg-red-gradiant-4'],
]
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('webButton') webButton!: ElementRef;
  @ViewChild('mobButton') mobButton!: ElementRef;
  @ViewChild('searcher') searcher!: ElementRef;

  isOpen: boolean = true;
  isNoti: boolean = false;

  moduleRouterLink!: any[];
  activeModule!: IModule | null;

  articles!: IArticles;

  randomAvatarSrc: string = this.randomAvatarService.get();

  navClass?: string;
  buttonClass?: string;
  searchClass = `${this.headerService.searchActive ? " show" : ""}`
  notiClass = `${this.isNoti ? " show" : ""}`

  keyword: string = this.headerService.keyword;
  searchActive: boolean = this.headerService.searchActive;

  avatar!: string;

  modulesServiceActiveModuleSubscription!: Subscription;
  authServiceAuthenticatedSubscription!: Subscription;
  menuServiceIsOpenSubscription!: Subscription;
  articleServiceArticles$Subscription!: Subscription;
  articleServiceGetArticlesSubscription!: Subscription;

  toggleActive(): void {
    this.headerService.searchActive = !this.headerService.searchActive;
  }

  toggleOpen(): void {
    this.menuService.toogleOpen();
  }

  toggleIsNoti(): void {
    this.isNoti = !this.isNoti;
  }

  handleCloseHeader(): void {
    this.headerService.searchActive = false;
  }

  bgClass(columIndex: number, index: number): string {
    return colors[columIndex][index % 4];
  }

  myTasks!: ITaskCard[];

  constructor(
    private randomAvatarService: RandomAvatarService,
    private menuService: MenuService,
    private headerService: HeaderService,
    private articleService: ArticleService,
    public authService: AuthService,
    private modulesService: ModulesService,
  ) { }

  ngOnInit(): void {
    this.moduleRouterLink = moduleRouterLink;
    this.modulesServiceActiveModuleSubscription = this.modulesService.activeModule.subscribe((value: IModule | null) => {
      this.activeModule = value;
    })
    this.menuServiceIsOpenSubscription =
      this.menuService.isOpen.subscribe((value: boolean) => {
        this.isOpen = value;
        this.buttonClass = value ? " active" : "";
        this.navClass = value ? " nav-active" : "";
      });
    this.articleServiceArticles$Subscription =
      this.articleService.articles$.subscribe((value: IArticles) => {
        this.articles = value;
      });
    const articlesRequest: IArticlesRequest = {
      catId: 7,
      currentPage: 1,
      keyword: '',
      pageSize: 10
    }

    if (this.authService.serverModel.modelName === 'MiukaFoto')
      this.articleServiceGetArticlesSubscription =
        this.articleService.getArticles(articlesRequest).subscribe(x => {
          this.articles = x.body
        });
    this.avatar = this.authService.avatar;

    const today = new Date();

    const yesterdayTaskTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0).getTime() - 1;
    let yesterdayTaskDateTime = new Date(yesterdayTaskTime);
    yesterdayTaskDateTime = new Date(yesterdayTaskDateTime.getFullYear(), yesterdayTaskDateTime.getMonth(), yesterdayTaskDateTime.getDate(), 9, 19, 0);

    const tomorrowTaskTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999).getTime() + 1;
    let tomorrowTaskDateTime = new Date(tomorrowTaskTime);
    tomorrowTaskDateTime = new Date(tomorrowTaskDateTime.getFullYear(), tomorrowTaskDateTime.getMonth(), tomorrowTaskDateTime.getDate(), 9, 19, 0);

    const theDayAfterTomorrowTaskTime = new Date(tomorrowTaskDateTime.getFullYear(), tomorrowTaskDateTime.getMonth(), tomorrowTaskDateTime.getDate(), 23, 59, 59, 999).getTime() + 1;
    let theDayAfterTomorrowTaskDateTime = new Date(theDayAfterTomorrowTaskTime);
    theDayAfterTomorrowTaskDateTime = new Date(theDayAfterTomorrowTaskDateTime.getFullYear(), theDayAfterTomorrowTaskDateTime.getMonth(), theDayAfterTomorrowTaskDateTime.getDate(), 9, 19, 0);

    const inTwoDayTaskTime = new Date(theDayAfterTomorrowTaskDateTime.getFullYear(), theDayAfterTomorrowTaskDateTime.getMonth(), theDayAfterTomorrowTaskDateTime.getDate(), 23, 59, 59, 999).getTime() + 1;
    let inTwoDayTaskDateTime = new Date(inTwoDayTaskTime);
    inTwoDayTaskDateTime = new Date(inTwoDayTaskDateTime.getFullYear(), inTwoDayTaskDateTime.getMonth(), inTwoDayTaskDateTime.getDate(), 9, 19, 0);


    const todayTaskDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() + 1, 19, 0);

    this.myTasks = [
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Thiết kế APP chat Core',
        dueDate: yesterdayTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Viết Login back-end chat Core',
        dueDate: todayTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Viết Login front-end chat Core',
        dueDate: todayTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng Layout front-end chat Core',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng menu front-end chat Core',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng Layout front-end chat Core',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng menu front-end chat Core',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng Layout front-end chat Core',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng menu front-end chat Core',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng Layout front-end chat Core',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng menu front-end chat Core',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng Layout front-end chat Core',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng menu front-end chat Core',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng Layout front-end chat Core',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng menu front-end chat Core',
        dueDate: inTwoDayTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng Layout front-end chat Core',
        dueDate: theDayAfterTomorrowTaskDateTime,
      },
      {
        paths: ['Phòng Kinh doanh', 'Dự án Lim Long'],
        title: 'Dựng menu front-end chat Core',
        dueDate: inTwoDayTaskDateTime,
      },
    ]

  }

  ngAfterViewInit(): void {
    this.searcher.nativeElement.style.position = 'absolute';

    this.headerService.searchLeft$.subscribe(x => {
      if (!!x) this.searcher.nativeElement.style.left = `${x}px`;
    });
    this.headerService.searchWidth$.subscribe(x => {
      if (!!x) this.searcher.nativeElement.style.width = `${x}px`;
    });

  }

  ngOnDestroy(): void {
    this.authServiceAuthenticatedSubscription.unsubscribe();
    this.menuServiceIsOpenSubscription.unsubscribe();
    this.articleServiceArticles$Subscription.unsubscribe();
    if (this.articleServiceGetArticlesSubscription) this.articleServiceGetArticlesSubscription.unsubscribe();

  }

}
