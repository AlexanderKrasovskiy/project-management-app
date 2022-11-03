import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, EMPTY } from 'rxjs';
import {
  LoginRequestModel,
  RegisterRequestModel,
  TokenResponseModel,
  UserModel,
} from '../models/auth.model';

@Injectable()
export class ApiHelpersService {
  constructor(private httpClient: HttpClient) {}

  register(payload: RegisterRequestModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>('signup', payload).pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      }),
    );
  }

  login(payload: LoginRequestModel): Observable<TokenResponseModel> {
    return this.httpClient.post<TokenResponseModel>('signin', payload).pipe(
      retry(4),
      catchError((error) => {
        console.log('[ERROR]: ', error);
        return EMPTY;
      }),
    );
  }
}
