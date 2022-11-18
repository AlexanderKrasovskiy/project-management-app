import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';

@Injectable()
export class MainErrorHandlerService {
  constructor(
    private messageService: MessageService,
    private transloco: TranslocoService,
    private router: Router,
  ) {}

  handleError(res: HttpErrorResponse) {
    const { message } = res.error;
    if (message === 'Board was not founded!')
      this.messageService.add({
        severity: 'error',
        summary: this.transloco.translate('details.errorTitle'),
        detail: this.transloco.translate('details.boardNotFound'),
        life: 5000,
      });
  }

  isKnownMessageType(res: HttpErrorResponse) {
    const { message } = res.error;
    if (message === 'Board was not founded!') return true;
    return false;
  }
}
