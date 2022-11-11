import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { fromEvent } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { IsBoardsService } from '../auth/services/is-boards.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  public stateOptions;

  public value1: string = 'En';

  public inScroll = false;

  constructor(
    // @inject(DOCUMENT) private document: Document,
    private transloco: TranslocoService,
    private router: Router,
    public authService: AuthService,
    public isBoardsService: IsBoardsService,
  ) {
    this.stateOptions = [
      { label: 'En', value: 'en' },
      { label: 'Ru', value: 'ru' },
    ];
  }

  ngOnInit(): void {
    fromEvent(window, 'scroll')
      // .pipe(throttleTime(50))
      .subscribe(() => {
        if (Number(document.defaultView?.scrollY) > 0) {
          this.inScroll = true;
          // console.log('scroll', event);
        } else {
          this.inScroll = false;
        }
      });
  }

  changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }

  authPage() {
    this.router.navigate(['/auth/registration']);
  }

  loginPage() {
    this.router.navigate(['/auth/login']);
  }
}
