import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  createBoard,
  deleteBoard,
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

  constructor(private store: Store, public mainService: MainService) {}

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

  deleteBoard(id: string): void {
    this.store.dispatch(deleteBoard({ id }));
  }
}
