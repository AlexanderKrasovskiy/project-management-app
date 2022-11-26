import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, switchMap } from 'rxjs';
import { BoardResModel, TaskModel, UserModel } from '../models/search.model';

import { ApiSearchService } from './api-search.service';

@Injectable({
  providedIn: 'any',
})
export class SearchService {
  constructor(
    private apiSearch: ApiSearchService,
    private location: Location,
  ) {}

  getTasks(): Observable<TaskModel[]> {
    return this.apiSearch.getAllBoards().pipe(
      mergeMap((boardsArr) => {
        return forkJoin(
          boardsArr.map((b) => this.apiSearch.getBoardById(b.id)),
        );
      }),
      map((arr) => this.getTasksByBoard(arr)),
      map((res) => res.flat(2)),
      switchMap((tasksArr) =>
        this.apiSearch
          .getAllUsers()
          .pipe(map((usersArr) => this.getTasksByUser(tasksArr, usersArr))),
      ),
    );
  }

  goBack(): void {
    this.location.back();
  }

  private getTasksByBoard(array: BoardResModel[]): TaskModel[][] {
    return array.map(({ id: boardId, columns }) => {
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
    });
  }

  private getTasksByUser(
    tasksArray: TaskModel[],
    usersArray: UserModel[],
  ): TaskModel[] {
    return tasksArray.map((task) => {
      usersArray.forEach((user) => {
        // eslint-disable-next-line no-param-reassign
        if (user.id === task.userId) task.userId = user.name;
      });
      return task;
    });
  }
}
