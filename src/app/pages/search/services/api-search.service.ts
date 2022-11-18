import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, retry } from 'rxjs';
import { BoardIDModel, BoardResModel, UserModel } from '../models/search.model';

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

  getBoardById(id: string): Observable<BoardResModel> {
    return this.http.get<BoardResModel>(`/boards/${id}`).pipe(
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
