import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SearchService {
  constructor(private router: Router) {}

  searchByWord(value: string) {
    if (value) this.router.navigate(['/search']);
  }
}
