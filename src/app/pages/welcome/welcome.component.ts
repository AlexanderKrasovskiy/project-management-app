import { AfterViewInit, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements AfterViewInit {
  constructor(
    private messageService: MessageService,
    private transLocoService: TranslocoService,
  ) {}

  ngAfterViewInit() {
    if (localStorage.getItem('PlanTokenInfo') === 'expired') {
      localStorage.removeItem('PlanTokenInfo');
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: this.transLocoService.translate('welcome.expired'),
      });
    }
  }
}
