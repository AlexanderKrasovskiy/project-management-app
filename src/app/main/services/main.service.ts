import { Injectable } from '@angular/core';

@Injectable()
export class MainService {
  isModalWindow: boolean = false;
  titleModalWindow: string = '';
  idBoard: string = '';

  showModalWindowForCreate(): void {
    this.isModalWindow = true;
    this.titleModalWindow = 'Создать доску?';
  }

  showModalWindowForUpdate(): void {
    this.isModalWindow = true;
    this.titleModalWindow = 'Обновить доску?';
  }

  hideModalWindow(): void {
    this.isModalWindow = false;
  }

  updateId(id: string) {
    this.idBoard = id;
  }
}
