import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, retry, catchError, EMPTY } from 'rxjs';
import { BoardIDRequestModel, BoardRequestModel } from '../models/main.model';

@Injectable()
export class ApiMainHelpersService {
  constructor(private httpClient: HttpClient, public store: Store) {}

  createBoard(payload: BoardRequestModel): Observable<BoardIDRequestModel> {
    return this.httpClient.post<BoardIDRequestModel>('/boards', payload).pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      }),
    );
  }

  deleteBoard(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/boards/${id}`).pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      }),
    );
  }

  getAllBoards(): Observable<BoardIDRequestModel[]> {
    return this.httpClient.get<BoardIDRequestModel[]>('/boards').pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      }),
    );
  }
}
