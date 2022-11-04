import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public stateOptions;

  public value1: string = 'En';

  constructor(private transloco: TranslocoService, private router: Router) {
    this.stateOptions = [
      { label: 'En', value: 'en' },
      { label: 'Ru', value: 'ru' },
    ];
  }

  ngOnInit(): void {
    fromEvent(window, 'scroll').subscribe((event) => {
      console.log('scroll', event);
    });
  }

  changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }

  authPage() {
    this.router.navigate(['/login']);
  }
}
