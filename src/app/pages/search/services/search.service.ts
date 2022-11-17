import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { TaskModel } from '../models/search.model';
import { ApiSearchService } from './api-search.service';

@Injectable({
  providedIn: 'any',
})
export class SearchService {
  tasks: TaskModel[] = [];
  tasksSubj$ = new ReplaySubject<TaskModel[] | null>();

  constructor(private apiSearch: ApiSearchService) {}

  getTasks() {
    this.apiSearch.getAllBoards().subscribe((boards) =>
      boards.forEach((board) => {
        this.apiSearch.getAllColumns(board.id).subscribe((columns) =>
          columns.forEach((column) => {
            this.apiSearch.getAllTasks(board.id, column.id).subscribe((tasks) =>
              tasks.forEach((task) => {
                this.apiSearch.getAllUsers().subscribe((users) => {
                  users.forEach((user) => {
                    if (task.userId === user.id) {
                      const newTask = { ...task, userId: user.name };
                      this.tasks.push(newTask);
                      this.tasksSubj$.next(this.tasks);
                    }
                  });
                });
              }),
            );
          }),
        );
      }),
    );
  }
}
