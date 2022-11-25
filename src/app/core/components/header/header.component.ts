import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { animationFrameScheduler, auditTime, fromEvent } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { LocalStorageItems } from 'src/app/shared/models/common.model';
import { CreateBoardService } from 'src/app/shared/services/create-board.service';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  stateOptions;

  value1 = localStorage.getItem(LocalStorageItems.PlanLanguageInfo) || 'en';

  inScroll = false;

  visibleSidebar1!: boolean;

  constructor(
    public createBoard: CreateBoardService,
    public authService: AuthService,
    public dialog: MatDialog,
    public filter: HeaderService,
    private transLoco: TranslocoService,
    private router: Router,
  ) {
    this.stateOptions = [
      { label: 'En', value: 'en' },
      { label: 'Ru', value: 'ru' },
    ];
  }

  ngOnInit(): void {
    this.transLoco.setActiveLang(
      localStorage.getItem(LocalStorageItems.PlanLanguageInfo) || 'en',
    );

    this.handleScroll();
  }

  handleScroll() {
    fromEvent(window, 'scroll')
      .pipe(auditTime(50, animationFrameScheduler))
      .subscribe(() => {
        if (window.scrollY > 0) {
          this.inScroll = true;
        } else {
          this.inScroll = false;
        }
      });
  }

  changeLang(lang: string) {
    this.transLoco.setActiveLang(lang);
    localStorage.setItem(LocalStorageItems.PlanLanguageInfo, lang);
  }

  authPage() {
    this.router.navigate(['/auth/registration']);
  }

  loginPage() {
    this.router.navigate(['/auth/login']);
  }
}
