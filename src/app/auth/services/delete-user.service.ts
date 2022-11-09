import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  ) {}

  // showModalWindowForUpdate(): void {
  //   this.isModalWindow = true;
  //   this.titleModalWindow = 'Обновить доску?';
  // }

  public showConfirmationModalWindow(): void {
    this.confirmationService.isConfirmationModalBoard = true;
    this.confirmationService.title = 'пользователя';
  }

  // updateId(id: string) {
  //   this.idUser = id;
  // }

  // public deleteUser(id: string): void {
  //   this.apiControlService.loginIn(id).subscribe((res) => {
  //     this.apiControlService.getUser(parseJwt(res.token).userId).subscribe();
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Success',
  //       detail: 'Successful login!',
  //       life: 5000,
  //     });
  //     setTimeout(() => {
  //       this.router.navigate(['boards']);
  //     }, 2000);
  //   });
  //   //  this.store.dispatch(deleteBoard({ id }));
  // }

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
        this.confirmationService.isConfirmationModalBoard = false;
        this.confirmationService.title = '';
        this.authService.logoutUser();
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 2000);
      });
  }
}
