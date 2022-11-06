import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, EMPTY } from 'rxjs';
import { MessageService } from 'primeng/api';
import {
  LoginRequestModel,
  RegisterRequestModel,
  TokenResponseModel,
  UserModel,
} from '../models/auth.model';

// @Injectable({
//   providers: [MessageService],
// })
@Injectable()
export class ApiHelpersService {
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
  ) {}

  register(payload: RegisterRequestModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>('/signup', payload).pipe(
      retry(4),
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Can not create user :(',
          life: 5000,
        });
        // console.log('[ERROR]: ', error);
        return EMPTY;
      }),
    );
  }

  login(payload: LoginRequestModel): Observable<TokenResponseModel> {
    return this.httpClient.post<TokenResponseModel>('/signin', payload).pipe(
      retry(4),
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Can not login :(',
          life: 5000,
        });
        return EMPTY;
      }),
    );
  }
}
