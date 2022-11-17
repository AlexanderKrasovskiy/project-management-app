import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from 'src/app/pages/search/models/search.model';

export enum SortKeyword {
  byWord = 'word',
  byOrder = 'order',
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
        const sortView = [...items].sort((a, b) => +b.order - +a.order);
        return keySort === BySort.descending ? sortView.reverse() : sortView;
      }
      default:
        return [...items];
    }
  }
}
