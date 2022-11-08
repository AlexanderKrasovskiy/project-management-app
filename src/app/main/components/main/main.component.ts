import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationModalService } from 'src/app/shared/services/confirmation-modal.service';
import {
  createBoard,
  loadBoards,
  updateBoard,
} from 'src/app/store/actions/boards.action';
import { selectCurrentBoards } from 'src/app/store/selectors/boards.selector';
import { BoardRequestModel } from '../../models/main.model';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  formMain: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  boards$ = this.store.select(selectCurrentBoards);

  constructor(
    private store: Store,
    public mainService: MainService,
    public confirmationService: ConfirmationModalService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
  }

  onSubmit() {
    if (this.mainService.titleModalWindow === 'Создать доску?')
      this.createNewBoard(this.formMain.value);
    else this.updateBoard(this.mainService.idBoard, this.formMain.value);
    this.formMain.reset();
    this.mainService.isModalWindow = false;
  }

  createNewBoard(board: BoardRequestModel): void {
    this.store.dispatch(
      createBoard({
        newBoard: board,
      }),
    );
  }

  updateBoard(id: string, board: BoardRequestModel): void {
    this.store.dispatch(
      updateBoard({
        id,
        newBoard: board,
      }),
    );
  }

  hideModalWindow(): void {
    this.mainService.isModalWindow = false;
    this.formMain.reset();
  }
}
