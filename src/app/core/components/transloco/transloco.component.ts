import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-transloco',
  templateUrl: './transloco.component.html',
})
export class TranslocoComponent {
  constructor(private transloco: TranslocoService, private router: Router) {}

  changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }

  authPage() {
    this.router.navigate(['/login']);
  }
}
