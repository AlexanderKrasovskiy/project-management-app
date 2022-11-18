import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, switchMap } from 'rxjs';

import { ApiSearchService } from './api-search.service';

@Injectable({
  providedIn: 'any',
})
export class SearchService {
  constructor(private apiSearch: ApiSearchService) {}

  getTasks() {
    return this.apiSearch.getAllBoards().pipe(
      mergeMap((boardsArr) => {
        return forkJoin(
          boardsArr.map((b) => this.apiSearch.getBoardById(b.id)),
        );
      }),
      map((arr) =>
        arr.map(({ id: boardId, columns }) => {
          const tasksArr = columns
            .map((col) => col.tasks)
            .flat(2)
            .map((task) => {
              return {
                ...task,
                boardId,
              };
            });
          return tasksArr;
        }),
      ),
      map((res) => res.flat(2)),
      switchMap((tasksArr) =>
        this.apiSearch.getAllUsers().pipe(
          map((usersArr) =>
            tasksArr.map((task) => {
              usersArr.forEach((user) => {
                // eslint-disable-next-line no-param-reassign
                if (user.id === task.userId) task.userId = user.name;
              });
              return task;
            }),
          ),
        ),
      ),
    );
  }
}
