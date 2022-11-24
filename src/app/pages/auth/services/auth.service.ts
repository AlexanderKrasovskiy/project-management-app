import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetUserModel, TokenResponseModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAvatarSwap: boolean = false;
  public images: string[] = [
    '_01',
    '_02',
    '_03',
    '_04',
    '_05',
    '_06',
    '_07',
    '_08',
    '_09',
    '_10',
    '_11',
    '_12',
    '_13',
    '_14',
  ];

  public isUserLogged$ = new BehaviorSubject<boolean>(false);

  private TOKEN_LIFE_DURATION = 12;

  public setToken(token: TokenResponseModel): void {
    localStorage.setItem('PlanTokenInfo', token.token);
    const datePlus = new Date();
    datePlus.setHours(datePlus.getHours() + this.TOKEN_LIFE_DURATION);
    localStorage.setItem('PlanTokenExpiredTime', datePlus.toString());
  }

  public setUser(user: GetUserModel): void {
    localStorage.setItem('PlanUserInfo', JSON.stringify(user));
    if (localStorage.getItem('PlanUserInfo')) {
      this.isUserLogged$.next(true);
    }
  }

  public getUserName(): string {
    return this.getPlanUserName();
  }

  public getUserAvatar(): string {
    return this.getPlanUserAvatar();
  }

  public logoutUser(): void {
    this.clearUserData();
  }

  public hideAvatarChangeModalWindow(): void {
    this.isAvatarSwap = false;
  }

  private getPlanUserName(): string {
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

  private getPlanUserAvatar(): string {
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

  private clearUserData(): void {
    localStorage.removeItem('PlanUserInfo');
    localStorage.removeItem('PlanTokenInfo');
    localStorage.removeItem('PlanTokenExpiredTime');
    this.isUserLogged$.next(false);
  }
}
