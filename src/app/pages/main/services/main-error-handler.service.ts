import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';

@Injectable()
export class MainErrorHandlerService {
  constructor(
    private messageService: MessageService,
    private transloco: TranslocoService,
  ) {}

  handleError(res: HttpErrorResponse) {
    const { message } = res.error;
    if (message === 'Board was not founded!')
      this.messageService.add({
        severity: 'error',
        summary: this.transloco.translate('details.errorTitle'),
        detail: this.transloco.translate('details.boardNotFound'),
      });
  }

  isKnownMessageType(res: HttpErrorResponse) {
    const { message } = res.error;
    if (message === 'Board was not founded!') return true;
    return false;
  }
}
