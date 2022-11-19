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
          .sort((a, b) => (a.title < b.title ? -1 : 1));
        const sort = [...numArr.concat(strArr)];
        return keySort === BySort.descending ? sort : sort.reverse();
      }
      case SortKeyword.byDescription: {
        const numArr = items
          .filter((el) => !Number.isNaN(Number(el.description)))
          .sort((a, b) => +a.description - +b.description);
        const strArr = items
          .filter((el) => Number.isNaN(Number(el.description)))
          .sort((a, b) => (a.description < b.description ? -1 : 1));
        const sort = [...numArr.concat(strArr)];
        return keySort === BySort.descending ? sort : sort.reverse();
      }
      case SortKeyword.byUser: {
        const numArr = items
          .filter((el) => !Number.isNaN(Number(el.userId)))
          .sort((a, b) => +a.userId - +b.userId);
        const strArr = items
          .filter((el) => Number.isNaN(Number(el.userId)))
          .sort((a, b) => (a.userId < b.userId ? -1 : 1));
        const sort = [...numArr.concat(strArr)];
        return keySort === BySort.descending ? sort : sort.reverse();
      }
      default:
        return [...items];
    }
  }
}
