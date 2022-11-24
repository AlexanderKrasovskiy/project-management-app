import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import {
  GetUserModel,
  LoginRequestModel,
  RegisterRequestModel,
  TokenResponseModel,
} from '../models/auth.model';
import { parseJwt } from '../utils/parse-token.util';
import { ApiHelpersService } from './api-helpers.service';
import { AuthService } from './auth.service';

@Injectable()
export class ApiControlService {
  constructor(
    private apiHelpers: ApiHelpersService,
    private authService: AuthService,
  ) {}

  public loginUp(user: RegisterRequestModel): Observable<GetUserModel> {
    return this.apiHelpers.register(user).pipe(
      tap((res) => {
        this.authService.setUser(res);
      }),
    );
  }

  public loginInReg(user: LoginRequestModel): Observable<TokenResponseModel> {
    return this.apiHelpers.login(user).pipe(
      tap((results) => {
        this.authService.setToken(results);
      }),
    );
  }

  public loginIn(user: LoginRequestModel): Observable<GetUserModel> {
    return this.apiHelpers.login(user).pipe(
      switchMap((res) => {
        this.authService.setToken(res);
        return this.getUser(parseJwt(res.token).userId);
      }),
    );
  }

  public getUser(id: string): Observable<GetUserModel> {
    return this.apiHelpers.user(id).pipe(
      tap((res) => {
        this.authService.setUser(res);
      }),
    );
  }

  public updateUser(
    id: string,
    user: RegisterRequestModel,
  ): Observable<GetUserModel> {
    return this.apiHelpers.update(id, user).pipe(
      tap((res) => {
        this.authService.setUser(res);
      }),
    );
  }

  public deleteUser(id: string): Observable<void> {
    return this.apiHelpers.delete(id).pipe();
  }
}
