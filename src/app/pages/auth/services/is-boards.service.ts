import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsBoardsService {
  constructor(private router: Router) {}

  public boardsPage(): boolean {
    if (this.router.url === '/boards') {
      return true;
    }
    return false;
  }
}
