import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HeaderService {
  keyWord: string = '';

  constructor(private router: Router) {}

  getKeyWord(value: string): void {
    this.keyWord = value.trim();
    if (value.trim()) {
      this.router.navigate(['/search']);
    }
  }
}
