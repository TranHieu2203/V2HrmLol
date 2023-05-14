import { Component, OnInit, isDevMode, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    '../assets/css/themify-icons.css',
    '../assets/css/feather.css',
    '../assets/css/style.css',
    '../assets/css/emoji.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  authenticated!: boolean;

  title = 'HiStaff Portal';
  submitting: boolean = true;
  popupMode!: boolean;

  color = '';

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.authService.authenticated$.subscribe(x => {
      this.authenticated = x
    });

    if (isDevMode()) {
      console.log('Development!');
      this.messageService.add(`${new Date().toLocaleString()}: Your application is running in Development mode!`);
    } else {
      console.log('Production!');
      this.messageService.add(`${new Date().toLocaleString()}: Your application is running in Production mode!`);
    }
    console.log(this.route.snapshot.outlet);

  }

  showHeroes = true;
  showConfig = true;
  showDownloader = true;
  showUploader = true;
  showSearch = true;

  toggleHeroes() { this.showHeroes = !this.showHeroes; }
  toggleConfig() { this.showConfig = !this.showConfig; }
  toggleDownloader() { this.showDownloader = !this.showDownloader; }
  toggleUploader() { this.showUploader = !this.showUploader; }
  toggleSearch() { this.showSearch = !this.showSearch; }
}
