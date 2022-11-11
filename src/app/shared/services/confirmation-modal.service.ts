import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmationModalService {
  title: string = '';
  isConfirmationModalBoard: boolean = false;
  isConfirmationModalTask: boolean = false;
  isConfirmationModalUser: boolean = false;

  hideConfirmationModalWindow(): void {
    this.isConfirmationModalBoard = false;
    this.isConfirmationModalTask = false;
    this.isConfirmationModalUser = false;
    this.title = '';
  }
}
