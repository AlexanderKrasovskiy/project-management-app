import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  GetUserModel,
  LoginRequestModel,
  ParsedToken,
  RegisterRequestModel,
  TokenResponseModel,
  UserModel,
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

  public loginUp(user: RegisterRequestModel): Observable<UserModel> {
    return this.apiHelpers.register(user).pipe(tap(() => {}));
  }

  public loginIn(user: LoginRequestModel): Observable<TokenResponseModel> {
    return this.apiHelpers.login(user).pipe(
      tap((results) => {
        this.authService.setToken(results);
        const parsedToken: ParsedToken = parseJwt(results.token);
        this.getUser(parsedToken.userId).subscribe((res) => {
          this.authService.setUser(res);
        });
      }),
    );
  }

  public getUser(id: string): Observable<GetUserModel> {
    return this.apiHelpers.user(id).pipe(tap(() => {}));
  }
}
