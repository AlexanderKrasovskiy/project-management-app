import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public stateOptions;

  public value1: string = 'En';

  constructor(private transloco: TranslocoService, private router: Router) {
    this.stateOptions = [
      { label: 'En', value: 'en' },
      { label: 'Ru', value: 'ru' },
    ];
  }

  changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }

  authPage() {
    this.router.navigate(['/login']);
  }
}
