import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-transloco',
  templateUrl: './transloco.component.html',
})
export class TranslocoComponent {
  public stateOptions;

  public value1: string = 'En';

  constructor(
    private transloco: TranslocoService,
    private primeNGConfig: PrimeNGConfig,
  ) {
    this.stateOptions = [
      { label: 'En', value: 'en' },
      { label: 'Ru', value: 'ru' },
    ];
  }

  changeLang(lang: string) {
    this.transloco.setActiveLang(lang);
  }

  ngOnInit() {
    this.primeNGConfig.ripple = true;
  }

  // onChange() {
  //   this.changeLang(this.value1);
  // }
}
