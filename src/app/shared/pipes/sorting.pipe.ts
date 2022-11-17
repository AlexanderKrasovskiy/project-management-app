import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from 'src/app/pages/search/models/search.model';

export enum SortKeyword {
  byWord = 'word',
  byDate = 'date',
  byOrder = 'order',
}

export enum BySort {
  ascending = '▼',
  descending = '▲',
}

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(items: TaskModel[], bySort: string, keySort: string): TaskModel[] {
    if (!keySort) return [];

    switch (bySort) {
      case SortKeyword.byWord: {
        return [...items].filter(
          (item) =>
            item.title.toLowerCase().includes(keySort.toLowerCase()) ||
            item.description.toLowerCase().includes(keySort.toLowerCase()) ||
            item.userId.toLowerCase().includes(keySort.toLowerCase()) ||
            String(item.order).includes(keySort),
        );
      }
      default:
        return items;
    }
  }
}
