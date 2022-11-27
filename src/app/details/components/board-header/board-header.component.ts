import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBoardTitle } from 'src/app/store/selectors/details.selectors';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent {
  boardTitle$ = this.store.select(selectBoardTitle);

  constructor(private store: Store) {}
}
