import { Injectable } from '@angular/core';
import { BySort } from 'src/app/shared/pipes/sorting.pipe';

@Injectable()
export class FilterService {
  public sortingDirection: string = '';

  public activeClass: string = '';

  public valueSort: string = '';

  public flagSortDirection: string = '';

  public changeSortValue(value: string): void {
    if (
      this.sortingDirection === '' ||
      this.sortingDirection === BySort.descending
    ) {
      this.sortingDirection = BySort.ascending;
    } else this.sortingDirection = BySort.descending;
    this.valueSort = value;
    this.flagSortDirection = this.sortingDirection;
    this.activeClass = value;
  }
}
