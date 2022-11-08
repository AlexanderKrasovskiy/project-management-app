import { Component } from '@angular/core';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent {
  displaySide = false;
  sideBarStyles = {
    width: '150px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(3px)',
  };
}
