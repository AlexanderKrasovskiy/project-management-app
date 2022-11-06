import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  createBoard,
  deleteBoard,
  loadBoards,
} from 'src/app/store/actions/boards.action';
import { selectCurrentBoards } from 'src/app/store/selectors/boards.selector';
import { ApiMainHelpersService } from '../../services/api-main-helpers.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(public api: ApiMainHelpersService, public store: Store) {}
  boards$ = this.store.select(selectCurrentBoards);

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
  }

  createNewBoard() {
    this.store.dispatch(
      createBoard({
        boards: { title: 'new board 5', description: 'app board' },
      }),
    );
  }

  removeBoard(id: string) {
    this.store.dispatch(deleteBoard({ id }));
  }
}
