import { Component } from '@angular/core';
import { DeleteUserService } from 'src/app/auth/services/delete-user.service';
import { MainService } from 'src/app/main/services/main.service';
import { ConfirmationModalService } from '../../services/confirmation-modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  constructor(
    public mainService: MainService,
    public deleteUserService: DeleteUserService,
    public confirmationService: ConfirmationModalService,
  ) {}
}
