import { Pipe, PipeTransform } from '@angular/core';
import {
  BySort,
  SortKeyWord,
  TaskModel,
} from 'src/app/search/models/search.model';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(items: TaskModel[], bySort: string, keySort: string): TaskModel[] {
    switch (bySort) {
      case SortKeyWord.byWord: {
        const filterByWord: TaskModel[] = this.getFilterArraybyWord(
          items,
          keySort,
        );

        return keySort ? filterByWord : [];
      }
      case SortKeyWord.byOrder: {
        const sort: TaskModel[] = [...items].sort(
          (a, b) => Number(b.order) - Number(a.order),
        );

        return keySort === BySort.descending ? sort.reverse() : sort;
      }
      case SortKeyWord.byTitle: {
        return this.getSortingArray(items, SortKeyWord.byTitle, keySort);
      }
      case SortKeyWord.byDescription: {
        return this.getSortingArray(items, SortKeyWord.byDescription, keySort);
      }
      case SortKeyWord.byUser: {
        return this.getSortingArray(items, SortKeyWord.byUser, keySort);
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
