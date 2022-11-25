import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { MessageError } from 'src/app/shared/models/common.model';
import { DetailsTranslations } from '../models/details-translate.model';

@Injectable()
export class DetailsErrorHandlerService {
  constructor(
    private messageService: MessageService,
    private transLoco: TranslocoService,
    private router: Router,
  ) {}

  handleError(res: HttpErrorResponse): void {
    const { message } = res.error;
    let toastText: string;

    switch (message) {
      case MessageError.boardNotFound:
        toastText = this.transLoco.translate(DetailsTranslations.boardNotFound);
        this.router.navigate(['boards']);
        break;
      case MessageError.columnNotFound:
        toastText = this.transLoco.translate(
          DetailsTranslations.columnNotFound,
        );
        break;
      case MessageError.taskNotFound:
        toastText = this.transLoco.translate(DetailsTranslations.taskNotFound);
        break;
      case MessageError.userNotFound:
        toastText = this.transLoco.translate(DetailsTranslations.userNotFound);
        break;
      default:
        toastText = this.transLoco.translate(DetailsTranslations.defaultError);
        this.router.navigate(['404']);
        break;
    }

    this.messageService.add({
      severity: 'error',
      summary: this.transLoco.translate(DetailsTranslations.errorTitle),
      detail: toastText,
    });
  }

  isKnownMessageType(res: HttpErrorResponse): boolean {
    const { message } = res.error;

    switch (message) {
      case MessageError.columnNotFound:
        return true;
      case MessageError.taskNotFound:
        return true;
      case MessageError.userNotFound:
        return true;
      default:
        return false;
    }
  }
}
