import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  createBoard,
  deleteBoard,
  loadBoards,
  updateBoard,
} from 'src/app/store/actions/boards.action';
import { selectCurrentBoards } from 'src/app/store/selectors/boards.selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(public store: Store) {}
  boards$ = this.store.select(selectCurrentBoards);

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
  }

  createNewBoard(): void {
    this.store.dispatch(
      createBoard({
        newBoard: { title: 'new board 5', description: 'app board' },
      }),
    );
  }

  updateBoard(id: string): void {
    this.store.dispatch(
      updateBoard({
        id,
        newBoard: { title: 'new board 7', description: 'app board' },
      }),
    );
  }

  deleteBoard(id: string): void {
    this.store.dispatch(deleteBoard({ id }));
  }
}
