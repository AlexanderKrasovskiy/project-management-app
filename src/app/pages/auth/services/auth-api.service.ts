import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, EMPTY } from 'rxjs';
import { MessageService } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';
import {
  GetUserModel,
  LoginRequestModel,
  RegisterRequestModel,
  TokenResponseModel,
} from '../models/auth.model';

@Injectable()
export class AuthApiService {
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
    private transLoco: TranslocoService,
  ) {}

  register(payload: RegisterRequestModel): Observable<GetUserModel> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<GetUserModel>('/signup', payload, {
        headers: header,
      })
      .pipe(
        retry(4),
        catchError((err) => {
          let errorText: string = this.transLoco.translate(
            'authApiService.notCreate',
          );
          errorText =
            err.error.statusCode === 409
              ? `${errorText}\n${this.transLoco.translate(
                  'authApiService.alreadyExists',
                )}`
              : errorText;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorText,
          });
          return EMPTY;
        }),
      );
  }

  login(payload: LoginRequestModel): Observable<TokenResponseModel> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<TokenResponseModel>('/signin', payload, {
        headers: header,
      })
      .pipe(
        retry(4),
        catchError((err) => {
          let errorText: string = this.transLoco.translate(
            'authApiService.notLogin',
          );
          errorText =
            err.error.statusCode === 403
              ? `${errorText}\n${this.transLoco.translate(
                  'authApiService.check',
                )}`
              : errorText;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorText,
          });
          return EMPTY;
        }),
      );
  }

  user(id: string): Observable<GetUserModel> {
    return this.httpClient.get<GetUserModel>(`/users/${id}`).pipe(
      retry(4),
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.transLoco.translate('authApiService.notFound'),
        });
        return EMPTY;
      }),
    );
  }

  update(id: string, payload: RegisterRequestModel): Observable<GetUserModel> {
    return this.httpClient.put<GetUserModel>(`/users/${id}`, payload).pipe(
      retry(4),
      catchError((err) => {
        let errorText: string = this.transLoco.translate(
          'authApiService.notUpdate',
        );
        errorText =
          err.error.statusCode === 500
            ? `${errorText}\n${this.transLoco.translate(
                'authApiService.perhapsExists',
              )}`
            : errorText;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorText,
        });
        return EMPTY;
      }),
    );
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/users/${id}`).pipe(
      retry(4),
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.transLoco.translate('authApiService.notDelete'),
        });
        return EMPTY;
      }),
    );
  }
}
