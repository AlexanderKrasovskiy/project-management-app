import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HeaderService {
  public keyWord: string = '';

  constructor(private router: Router) {}

  public getKeyWord(value: string): void {
    this.keyWord = value.trim();
    if (value) this.router.navigate(['/search']);
  }
}
