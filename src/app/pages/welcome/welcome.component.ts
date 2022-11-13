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
    private translocoService: TranslocoService,
  ) {}

  ngAfterViewInit() {
    if (localStorage.getItem('PlanTokenInfo') === 'expired') {
      localStorage.removeItem('PlanTokenInfo');
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: this.translocoService.translate('welcome.expired'),
        life: 5000,
      });
    }
  }
}
