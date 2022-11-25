import { Injectable } from '@angular/core';
import { BySort, SortKeyWord } from '../models/search.model';

@Injectable()
export class FilterService {
  isOrder: boolean = false;
  isTitle: boolean = false;
  isDescription: boolean = false;
  isUser: boolean = false;
  sortingDirection: string = '';
  activeClass: string = '';
  valueSort: string = '';
  flagSortDirection: string = '';

  changeSortValue(value: string): void {
    this.isOrder = false;
    this.isTitle = false;
    this.isDescription = false;
    this.isUser = false;
    this.valueSort = value;
    this.activeClass = value;

    this.getSortingDirection();
    this.getSortingValue(value);
  }

  private getSortingDirection(): void {
    if (
      this.sortingDirection === '' ||
      this.sortingDirection === BySort.descending
    ) {
      this.sortingDirection = BySort.ascending;
    } else {
      this.sortingDirection = BySort.descending;
    }

    this.flagSortDirection = this.sortingDirection;
  }

  private getSortingValue(value: string): void {
    switch (value) {
      case SortKeyWord.byOrder: {
        this.isOrder = true;
        break;
      }
      case SortKeyWord.byTitle: {
        this.isTitle = true;
        break;
      }
      case SortKeyWord.byDescription: {
        this.isDescription = true;
        break;
      }
      default:
        this.isUser = true;
    }
  }
}
