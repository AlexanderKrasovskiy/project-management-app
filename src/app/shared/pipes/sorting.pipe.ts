import { Pipe, PipeTransform } from '@angular/core';
import {
  BySort,
  SortKeyword,
  TaskModel,
} from 'src/app/pages/search/models/search.model';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(items: TaskModel[], bySort: string, keySort: string): TaskModel[] {
    switch (bySort) {
      case SortKeyword.byWord: {
        const filterByWord: TaskModel[] = this.getFilterArraybyWord(
          items,
          keySort,
        );

        return keySort ? filterByWord : [];
      }
      case SortKeyword.byOrder: {
        const sort: TaskModel[] = [...items].sort(
          (a, b) => Number(b.order) - Number(a.order),
        );

        return keySort === BySort.descending ? sort.reverse() : sort;
      }
      case SortKeyword.byTitle: {
        return this.getSortingArray(items, SortKeyword.byTitle, keySort);
      }
      case SortKeyword.byDescription: {
        return this.getSortingArray(items, SortKeyword.byDescription, keySort);
      }
      case SortKeyword.byUser: {
        return this.getSortingArray(items, SortKeyword.byUser, keySort);
      }
      default:
        return [...items];
    }
  }

  private getFilterArraybyWord(
    items: TaskModel[],
    keySort: string,
  ): TaskModel[] {
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(keySort.toLowerCase()) ||
        item.description.toLowerCase().includes(keySort.toLowerCase()) ||
        item.userId.toLowerCase().includes(keySort.toLowerCase()) ||
        String(item.order).includes(keySort),
    );
  }

  private getSortingArray(
    items: TaskModel[],
    bySort: string,
    keySort: string,
  ): TaskModel[] {
    const numArr = items
      .filter((el) => !Number.isNaN(Number(el[bySort as keyof TaskModel])))
      .sort(
        (a, b) =>
          Number(a[bySort as keyof TaskModel]) -
          Number(b[bySort as keyof TaskModel]),
      );

    const strArr = items
      .filter((el) => Number.isNaN(Number(el[bySort as keyof TaskModel])))
      .sort((a, b) =>
        (<string>a[bySort as keyof TaskModel]).toLowerCase() <
        (<string>b[bySort as keyof TaskModel]).toLowerCase()
          ? -1
          : 1,
      );
    const sort = [...numArr.concat(strArr)];

    return keySort === BySort.descending ? sort : sort.reverse();
  }
}
