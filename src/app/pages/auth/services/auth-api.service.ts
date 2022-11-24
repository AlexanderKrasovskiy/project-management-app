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
    private translocoService: TranslocoService,
  ) {}

  public register(payload: RegisterRequestModel): Observable<GetUserModel> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<GetUserModel>('/signup', payload, {
        headers: header,
      })
      .pipe(
        retry(4),
        catchError((err) => {
          let errorText: string = this.translocoService.translate(
            'authApiService.notCreate',
          );
          errorText =
            err.error.statusCode === 409
              ? `${errorText}\n${this.translocoService.translate(
                  'authApiService.alreadyExists',
                )}`
              : errorText;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorText,
          });
          // console.log('[ERROR]: ', error);
          // console.error(err.error.message);
          return EMPTY;
        }),
      );
  }

  public login(payload: LoginRequestModel): Observable<TokenResponseModel> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<TokenResponseModel>('/signin', payload, {
        headers: header,
      })
      .pipe(
        retry(4),
        catchError((err) => {
          let errorText: string = this.translocoService.translate(
            'authApiService.notLogin',
          );
          errorText =
            err.error.statusCode === 403
              ? `${errorText}\n${this.translocoService.translate(
                  'authApiService.check',
                )}`
              : errorText;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorText,
          });

          // console.error(err.error.statusCode);
          // console.error(err.error.message);
          // console.error(err);
          // console.error(err.status);
          // console.error(err.statusText);
          // console.error(`${err.statusText || ''} ${err.error.message || ''}`);

          return EMPTY;
        }),
      );
  }

  public user(id: string): Observable<GetUserModel> {
    return this.httpClient.get<GetUserModel>(`/users/${id}`).pipe(
      retry(4),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.translocoService.translate('authApiService.notFound'),
        });
        // console.error(err.error.message);
        return EMPTY;
      }),
    );
  }

  public update(
    id: string,
    payload: RegisterRequestModel,
  ): Observable<GetUserModel> {
    return this.httpClient.put<GetUserModel>(`/users/${id}`, payload).pipe(
      retry(4),
      catchError((err) => {
        let errorText: string = this.translocoService.translate(
          'authApiService.notUpdate',
        );
        errorText =
          err.error.statusCode === 500
            ? `${errorText}\n${this.translocoService.translate(
                'authApiService.perhapsExists',
              )}`
            : errorText;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorText,
        });
        // console.error(err.error.message);
        return EMPTY;
      }),
    );
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/users/${id}`).pipe(
      retry(4),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.translocoService.translate('authApiService.notDelete'),
        });
        // console.error(err.error.message);
        return EMPTY;
      }),
    );
  }
}
