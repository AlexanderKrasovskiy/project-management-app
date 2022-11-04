import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ApiMainHelpersService } from '../../services/api-main-helpers.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private api: ApiMainHelpersService) {}

  ngOnInit(): void {
    this.api
      .getAllBoards()
      .pipe(tap((r) => console.log(r)))
      .subscribe();
  }
}
