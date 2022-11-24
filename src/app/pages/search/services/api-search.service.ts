import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, Observable, retry } from 'rxjs';
import { BoardIDModel, BoardResModel, UserModel } from '../models/search.model';

@Injectable()
export class ApiSearchService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private transloco: TranslocoService,
  ) {}

  getAllBoards(): Observable<BoardIDModel[]> {
    return this.http.get<BoardIDModel[]>('/boards').pipe(
      retry(4),
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.transloco.translate('details.boardNotFound'),
        });
        return EMPTY;
      }),
    );
  }

  getBoardById(id: string): Observable<BoardResModel> {
    return this.http.get<BoardResModel>(`/boards/${id}`).pipe(
      retry(4),
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.transloco.translate('details.boardNotFound'),
        });
        return EMPTY;
      }),
    );
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`/users`).pipe(
      retry(4),
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.transloco.translate('authApiService.notFound'),
        });
        return EMPTY;
      }),
    );
  }
}
