import { AfterViewInit, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { LocalStorageItems } from 'src/app/shared/models/common.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements AfterViewInit {
  constructor(
    private messageService: MessageService,
    private transLoco: TranslocoService,
  ) {}

  ngAfterViewInit() {
    if (localStorage.getItem(LocalStorageItems.PlanTokenInfo) === 'expired') {
      localStorage.removeItem(LocalStorageItems.PlanTokenInfo);
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: this.transLoco.translate('welcome.expired'),
      });
    }
  }
}
