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
  // private TOKEN_LIFE_DURATION = 2;
  isAvatarSwap: boolean = false;
  images: string[] = [
    '_01',
    '_02',
    '_03',
    '_04',
    '_05',
    '_06',
    '_07',
    '_08',
    '_09',
  ];

  private TOKEN_LIFE_DURATION = 12;

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

  public getUserName(): string {
    if (
      localStorage.getItem('PlanUserInfo') &&
      localStorage.getItem('PlanTokenInfo')
    ) {
      this.isUserLogged$.next(true);
      return JSON.parse(`${localStorage.getItem('PlanUserInfo')}`).name.slice(
        -3,
        -2,
      ) === '_'
        ? JSON.parse(`${localStorage.getItem('PlanUserInfo')}`).name.slice(
            0,
            -3,
          )
        : JSON.parse(`${localStorage.getItem('PlanUserInfo')}`).name;
    }
    return '';
  }

  public getUserAvatar(): string {
    if (
      localStorage.getItem('PlanUserInfo') &&
      localStorage.getItem('PlanTokenInfo')
    ) {
      this.isUserLogged$.next(true);
      return JSON.parse(`${localStorage.getItem('PlanUserInfo')}`).name.slice(
        -3,
        -2,
      ) === '_'
        ? JSON.parse(`${localStorage.getItem('PlanUserInfo')}`).name.slice(-2)
        : '01';
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

  public hideAvatarChangeModalWindow(): void {
    this.isAvatarSwap = false;
  }
}
