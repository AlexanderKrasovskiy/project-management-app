import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';

@Injectable()
export class DetailsErrorHandlerService {
  constructor(
    private messageService: MessageService,
    private transloco: TranslocoService,
    private router: Router,
  ) {}

  handleError(res: HttpErrorResponse) {
    const { message } = res.error;
    let toastText: string;

    switch (message) {
      case 'Board was not founded!':
        toastText = this.transloco.translate('details.boardNotFound');
        this.router.navigate(['boards']);
        break;
      case 'Column was not founded!':
        toastText = this.transloco.translate('details.columnNotFound');
        break;
      case 'Task was not founded!':
        toastText = this.transloco.translate('details.taskNotFound');
        break;
      case 'User was not founded!':
        toastText = this.transloco.translate('details.userNotFound');
        break;
      default:
        toastText = this.transloco.translate('details.defaultError');
        this.router.navigate(['404']);
        break;
    }

    this.messageService.add({
      severity: 'error',
      summary: this.transloco.translate('details.errorTitle'),
      detail: toastText,
    });
  }

  isKnownMessageType(res: HttpErrorResponse) {
    const { message } = res.error;

    if (message === 'Column was not founded!') return true;
    if (message === 'Task was not founded!') return true;
    if (message === 'User was not founded!') return true;
    return false;
  }
}
