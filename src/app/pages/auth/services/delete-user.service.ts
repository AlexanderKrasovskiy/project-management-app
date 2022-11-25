import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { filter, tap } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { LocalStorageItems } from 'src/app/shared/models/common.model';
import { parseJwt } from '../utils/parse-token.util';
import { AuthControlService } from './auth-control.service';
import { AuthService } from './auth.service';

@Injectable()
export class DeleteUserService {
  isModalWindow: boolean = false;
  titleModalWindow: string = '';
  idUser: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private authControlService: AuthControlService,
    private messageService: MessageService,
    private transLoco: TranslocoService,
    private dialog: MatDialog,
  ) {}

  openDeleteUserModal(): void {
    const data = this.transLoco.translate('confirmation.deleteUser');

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((modalData) => modalData),
        tap(() => this.removeUser()),
      )
      .subscribe();
  }

  removeUser() {
    this.authControlService
      .deleteUser(
        parseJwt(
          localStorage.getItem(LocalStorageItems.PlanTokenInfo) as string,
        ).userId,
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.transLoco.translate('deleteUser.successful'),
        });
        this.authService.logoutUser();
        this.router.navigate(['welcome']);
      });
  }
}
