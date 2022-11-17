import { Injectable } from '@angular/core';
import { BySort, SortKeyword } from 'src/app/shared/pipes/sorting.pipe';

@Injectable()
export class FilterService {
  isOrder: boolean = false;
  isTitle: boolean = false;
  isDescription: boolean = false;
  isUser: boolean = false;
  sortingDirection: string = '▼▲';
  activeClass: string = '';
  valueSort: string = '';
  flagSortDirection: string = '';

  changeSortValue(value: string): void {
    this.isOrder = false;
    this.isTitle = false;
    this.isDescription = false;
    this.isUser = false;
    if (
      this.sortingDirection === '' ||
      this.sortingDirection === BySort.descending
    ) {
      this.sortingDirection = BySort.ascending;
    } else this.sortingDirection = BySort.descending;
    this.valueSort = value;
    this.flagSortDirection = this.sortingDirection;
    this.activeClass = value;

    if (value === SortKeyword.byOrder) this.isOrder = true;
    if (value === SortKeyword.byTitle) this.isTitle = true;
    if (value === SortKeyword.byDescription) this.isDescription = true;
    if (value === SortKeyword.byUser) this.isUser = true;
  }
}
