import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import {
  GetUserModel,
  LoginRequestModel,
  RegisterRequestModel,
  TokenResponseModel,
} from '../models/auth.model';
import { parseJwt } from '../utils/parse-token.util';
import { AuthApiService } from './auth-api.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthControlService {
  constructor(
    private authApiService: AuthApiService,
    private authService: AuthService,
  ) {}

  loginUp(user: RegisterRequestModel): Observable<GetUserModel> {
    return this.authApiService.register(user).pipe(
      tap((res) => {
        this.authService.setUser(res);
      }),
    );
  }

  loginInReg(user: LoginRequestModel): Observable<TokenResponseModel> {
    return this.authApiService.login(user).pipe(
      tap((results) => {
        this.authService.setToken(results);
      }),
    );
  }

  loginIn(user: LoginRequestModel): Observable<GetUserModel> {
    return this.authApiService.login(user).pipe(
      switchMap((res) => {
        this.authService.setToken(res);
        return this.getUser(parseJwt(res.token).userId);
      }),
    );
  }

  getUser(id: string): Observable<GetUserModel> {
    return this.authApiService.user(id).pipe(
      tap((res) => {
        this.authService.setUser(res);
      }),
    );
  }

  updateUser(id: string, user: RegisterRequestModel): Observable<GetUserModel> {
    return this.authApiService.update(id, user).pipe(
      tap((res) => {
        this.authService.setUser(res);
      }),
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.authApiService.delete(id).pipe();
  }
}
