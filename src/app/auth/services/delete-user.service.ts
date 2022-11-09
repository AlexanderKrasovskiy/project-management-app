import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { ConfirmationModalService } from 'src/app/shared/services/confirmation-modal.service';
import { parseJwt } from '../utils/parse-token.util';
import { ApiControlService } from './api-control.service';
import { AuthService } from './auth.service';

@Injectable()
export class DeleteUserService {
  isModalWindow: boolean = false;
  titleModalWindow: string = '';
  idUser: string = '';

  constructor(
    private router: Router,
    public confirmationService: ConfirmationModalService,
    public authService: AuthService,
    private apiControlService: ApiControlService,
    private messageService: MessageService,
    private translocoService: TranslocoService,
  ) {}

  // showModalWindowForUpdate(): void {
  //   this.isModalWindow = true;
  //   this.titleModalWindow = 'Обновить доску?';
  // }

  public showConfirmationModalWindow(): void {
    this.confirmationService.isConfirmationModalUser = true;
    this.confirmationService.title = 'пользователя';
  }

  public removeUser() {
    this.apiControlService
      .deleteUser(
        parseJwt(localStorage.getItem('PlanTokenInfo') as string).userId,
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successful delete!',
          life: 5000,
        });
        this.confirmationService.isConfirmationModalUser = false;
        this.confirmationService.title = '';
        this.authService.logoutUser();
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 2000);
      });
  }
}
