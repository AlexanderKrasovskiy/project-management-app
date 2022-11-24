import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';

@Injectable()
export class MainErrorHandlerService {
  constructor(
    private messageService: MessageService,
    private transLoco: TranslocoService,
  ) {}

  handleError(res: HttpErrorResponse): void {
    const { message } = res.error;
    if (message === 'Board was not founded!') {
      this.messageService.add({
        severity: 'error',
        summary: this.transLoco.translate('details.errorTitle'),
        detail: this.transLoco.translate('details.boardNotFound'),
      });
    }
  }

  isKnownMessageType(res: HttpErrorResponse): boolean {
    const { message } = res.error;
    if (message === 'Board was not founded!') {
      return true;
    }
    return false;
  }
}
