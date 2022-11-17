import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, retry } from 'rxjs';
import {
  BoardIDModel,
  ColumnModel,
  TaskModel,
  UserModel,
} from '../models/search.model';

@Injectable()
export class ApiSearchService {
  constructor(private http: HttpClient) {}

  getAllBoards(): Observable<BoardIDModel[]> {
    return this.http.get<BoardIDModel[]>('/boards').pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      }),
    );
  }

  getAllColumns(id: string): Observable<ColumnModel[]> {
    return this.http.get<ColumnModel[]>(`/boards/${id}/columns`).pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      }),
    );
  }

  getAllTasks(idBoard: string, idColumn: string): Observable<TaskModel[]> {
    return this.http
      .get<TaskModel[]>(`/boards/${idBoard}/columns/${idColumn}/tasks`)
      .pipe(
        retry(4),
        catchError((error) => {
          console.log('[ERROR]: ', error);
          return EMPTY;
        }),
      );
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`/users`).pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      }),
    );
  }
}
