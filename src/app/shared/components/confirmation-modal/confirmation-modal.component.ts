import { Component } from '@angular/core';
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
    public confirmationService: ConfirmationModalService,
  ) {}
}
