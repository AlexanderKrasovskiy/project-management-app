import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
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
    private dialog: MatDialog,
  ) {}

  public openDeleteUserModal(): void {
    const data = this.translocoService.translate('confirmation.deleteUser');

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    dialogRef.afterClosed().subscribe((modalData) => {
      if (modalData) this.removeUser();
    });
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
          detail: this.translocoService.translate('deleteUser.successful'),
        });
        this.confirmationService.isConfirmationModalUser = false;
        this.confirmationService.title = '';
        this.authService.logoutUser();
        this.router.navigate(['auth/login']);
      });
  }
}
