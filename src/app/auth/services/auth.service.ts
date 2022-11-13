import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  GetUserModel,
  TokenResponseModel,
  // UserModel,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN_LIFE_DURATION = 2;
  // private TOKEN_LIFE_DURATION = 1;

  public isUserLogged$ = new BehaviorSubject<boolean>(false);

  public setToken(token: TokenResponseModel): void {
    localStorage.setItem('PlanTokenInfo', token.token);
    const datePlus = new Date();
    datePlus.setHours(datePlus.getHours() + this.TOKEN_LIFE_DURATION);
    // datePlus.setMinutes(datePlus.getMinutes() + this.TOKEN_LIFE_DURATION);
    localStorage.setItem('PlanTokenExpiredTime', datePlus.toString());
  }

  public setUser(user: GetUserModel): void {
    localStorage.setItem('PlanUserInfo', JSON.stringify(user));
    if (localStorage.getItem('PlanUserInfo')) {
      this.isUserLogged$.next(true);
    }
    // localStorage.setItem('PlanNameInfo', name.trim());
    // this.isUserRegistered$.next(true);
  }

  public getUser(): string {
    if (
      localStorage.getItem('PlanUserInfo') &&
      localStorage.getItem('PlanTokenInfo')
    ) {
      // this.isUserRegistered$.next(true);
      this.isUserLogged$.next(true);
      // return localStorage.getItem('PlanUserInfo') as string;
      return JSON.parse(localStorage.getItem('PlanUserInfo') as string)
        .name as string;
    }
    return '';
  }

  public logoutUser(): void {
    localStorage.removeItem('PlanUserInfo');
    localStorage.removeItem('PlanTokenInfo');
    localStorage.removeItem('PlanTokenExpiredTime');
    this.isUserLogged$.next(false);
    // this.isUserRegistered$.next(false);
  }
}
