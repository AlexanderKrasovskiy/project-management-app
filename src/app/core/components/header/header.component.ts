import {
  Component,
  // HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { animationFrameScheduler, auditTime, fromEvent } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { CreateBoardService } from 'src/app/shared/services/create-board.service';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  public stateOptions;

  public value1 = localStorage.getItem('PlanLanguageInfo') || 'en';

  public inScroll = false;

  public visibleSidebar1!: boolean;

  constructor(
    // @inject(DOCUMENT) private document: Document,
    public createBoardMoadal: CreateBoardService,
    private transloco: TranslocoService,
    private router: Router,
    public authService: AuthService,
    public dialog: MatDialog,
    private store: Store,
    public filter: HeaderService,
  ) {
    this.stateOptions = [
      { label: 'En', value: 'en' },
      { label: 'Ru', value: 'ru' },
    ];
  }

  ngOnInit(): void {
    this.transloco.setActiveLang(
      localStorage.getItem('PlanLanguageInfo') || 'en',
    );

    this.handleScroll();
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
  //     this.inScroll = true;
  //   } else {
  //     this.inScroll = false;
  //   }
  // }
  // fromEvent(window, 'scroll')
  //   // .pipe(throttleTime(50))
  //   .subscribe(() => {
  //     if (Number(document.defaultView?.scrollY) > 0) {
  //       this.inScroll = true;
  //       // console.log('scroll', event);
  //     } else {
  //       this.inScroll = false;
  //     }
  //   });
  //  }
  handleScroll() {
    fromEvent(window, 'scroll')
      .pipe(auditTime(50, animationFrameScheduler))
      .subscribe(() => {
        // console.log('scroll', window.scrollY);
        if (window.scrollY > 0) {
          this.inScroll = true;
        } else {
          this.inScroll = false;
        }
      });
  }

  changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
    localStorage.setItem('PlanLanguageInfo', lang);
  }

  authPage() {
    this.router.navigate(['/auth/registration']);
  }

  loginPage() {
    this.router.navigate(['/auth/login']);
  }
}
