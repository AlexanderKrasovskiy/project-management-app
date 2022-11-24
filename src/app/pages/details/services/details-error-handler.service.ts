import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';

@Injectable()
export class DetailsErrorHandlerService {
  constructor(
    private messageService: MessageService,
    private transLoco: TranslocoService,
    private router: Router,
  ) {}

  handleError(res: HttpErrorResponse) {
    const { message } = res.error;
    let toastText: string;

    switch (message) {
      case 'Board was not founded!':
        toastText = this.transLoco.translate('details.boardNotFound');
        this.router.navigate(['boards']);
        break;
      case 'Column was not founded!':
        toastText = this.transLoco.translate('details.columnNotFound');
        break;
      case 'Task was not founded!':
        toastText = this.transLoco.translate('details.taskNotFound');
        break;
      case 'User was not founded!':
        toastText = this.transLoco.translate('details.userNotFound');
        break;
      default:
        toastText = this.transLoco.translate('details.defaultError');
        this.router.navigate(['404']);
        break;
    }

    this.messageService.add({
      severity: 'error',
      summary: this.transLoco.translate('details.errorTitle'),
      detail: toastText,
      life: 5000,
    });
  }

  isKnownMessageType(res: HttpErrorResponse) {
    const { message } = res.error;

    switch (message) {
      case 'Column was not founded!':
        return true;
      case 'Task was not founded!':
        return true;
      case 'User was not founded!':
        return true;
      default:
        return false;
    }
  }
}
