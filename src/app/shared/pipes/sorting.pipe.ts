import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from 'src/app/pages/search/models/search.model';

export enum SortKeyword {
  byWord = 'word',
  byOrder = 'order',
  byTitle = 'title',
  byDescription = 'description',
  byUser = 'user',
}

export enum BySort {
  ascending = '▼',
  descending = '▲',
}

@Pipe({
  name: 'sorting',
  pure: false,
})
export class SortingPipe implements PipeTransform {
  transform(items: TaskModel[], bySort: string, keySort: string): TaskModel[] {
    switch (bySort) {
      case SortKeyword.byWord: {
        if (!keySort) return [];
        return items.filter(
          (item) =>
            item.title.toLowerCase().includes(keySort.toLowerCase()) ||
            item.description.toLowerCase().includes(keySort.toLowerCase()) ||
            item.userId.toLowerCase().includes(keySort.toLowerCase()) ||
            String(item.order).includes(keySort),
        );
      }
      case SortKeyword.byOrder: {
        const sort = [...items].sort(
          (a, b) => Number(b.order) - Number(a.order),
        );
        return keySort === BySort.descending ? sort.reverse() : sort;
      }
      case SortKeyword.byTitle: {
        const numArr = items
          .filter((el) => !Number.isNaN(Number(el.title)))
          .sort((a, b) => +a.title - +b.title);
        const strArr = items
          .filter((el) => Number.isNaN(Number(el.title)))
          .sort();
        const sort = [...numArr.concat(strArr)];
        return keySort === BySort.descending ? sort : sort.reverse();
      }
      case SortKeyword.byDescription: {
        const sort = [...items].sort((a, b) =>
          +a.description > +b.description ? 1 : -1,
        );
        return keySort === BySort.descending ? sort.reverse() : sort;
      }
      case SortKeyword.byUser: {
        const sort = [...items].sort((a, b) => (a.userId > b.userId ? 1 : -1));
        return keySort === BySort.descending ? sort.reverse() : sort;
      }
      default:
        return [...items];
    }
  }
}
