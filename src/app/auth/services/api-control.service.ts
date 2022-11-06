import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  LoginRequestModel,
  RegisterRequestModel,
  TokenResponseModel,
  UserModel,
} from '../models/auth.model';
import { ApiHelpersService } from './api-helpers.service';

@Injectable()
export class ApiControlService {
  constructor(private apiHelpers: ApiHelpersService) {}

  public loginUp(user: RegisterRequestModel): Observable<UserModel> {
    return this.apiHelpers.register(user).pipe(
      tap((results) => {
        localStorage.setItem('PlanUserInfo', JSON.stringify(results));
      }),
    );
    // .subscribe();
  }

  public loginIn(user: LoginRequestModel): Observable<TokenResponseModel> {
    return this.apiHelpers
      .login(user)
      .pipe(
        tap((results) => localStorage.setItem('PlanTokenInfo', results.token)),
      );
    //  .subscribe();
  }
}
