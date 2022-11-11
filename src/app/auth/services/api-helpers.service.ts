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
  // UserModel,
} from '../models/auth.model';
// import { TranslocoService } from '@ngneat/transloco';
// import { AuthService } from './auth.service';

// @Injectable({
//   providers: [MessageService],
// })
@Injectable()
export class ApiHelpersService {
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
    // private authService: AuthService,
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
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${this.translocoService.translate(
              'apiHelpers.notCreate',
            )}`,
            life: 5000,
          });
          // console.log('[ERROR]: ', error);
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
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${this.translocoService.translate('apiHelpers.notLogin')}`,
            life: 5000,
          });
          console.log('login', err);
          // this.authService.logoutUser();
          return EMPTY;
        }),
      );
  }

  public user(id: string): Observable<GetUserModel> {
    return this.httpClient.get<GetUserModel>(`/users/${id}`).pipe(
      retry(4),
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${this.translocoService.translate('apiHelpers.notFind')}`,
          life: 5000,
        });
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
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${this.translocoService.translate('apiHelpers.notUpdate')}`,
          life: 5000,
        });
        return EMPTY;
      }),
    );
  }

  public delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/users/${id}`).pipe(
      retry(4),
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${this.translocoService.translate('apiHelpers.notDelete')}`,
          life: 5000,
        });
        return EMPTY;
      }),
    );
  }
}
