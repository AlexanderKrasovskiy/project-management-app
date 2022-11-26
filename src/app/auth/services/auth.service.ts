import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageItems } from 'src/app/shared/models/common.model';
import { GetUserModel, TokenResponseModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
    '_10',
    '_11',
    '_12',
    '_13',
    '_14',
  ];

  isUserLogged$ = new BehaviorSubject<boolean>(false);

  private TOKEN_LIFE_DURATION = 12;

  setToken(token: TokenResponseModel): void {
    localStorage.setItem(LocalStorageItems.PlanTokenInfo, token.token);
    const datePlus = new Date();
    datePlus.setHours(datePlus.getHours() + this.TOKEN_LIFE_DURATION);
    localStorage.setItem(
      LocalStorageItems.PlanTokenExpiredTime,
      datePlus.toString(),
    );
    this.isUserLogged$.next(true);
  }

  setUser(user: GetUserModel): void {
    localStorage.setItem(LocalStorageItems.PlanUserInfo, JSON.stringify(user));
  }

  getUserName(): string {
    return this.getPlanUserName();
  }

  getUserAvatar(): string {
    return this.getPlanUserAvatar();
  }

  logoutUser(): void {
    this.clearUserData();
  }

  hideAvatarChangeModalWindow(): void {
    this.isAvatarSwap = false;
  }

  private getPlanUserName(): string {
    if (
      localStorage.getItem(LocalStorageItems.PlanUserInfo) &&
      localStorage.getItem(LocalStorageItems.PlanTokenInfo)
    ) {
      this.isUserLogged$.next(true);
      return JSON.parse(
        `${localStorage.getItem(LocalStorageItems.PlanUserInfo)}`,
      ).name.slice(-3, -2) === '_'
        ? JSON.parse(
            `${localStorage.getItem(LocalStorageItems.PlanUserInfo)}`,
          ).name.slice(0, -3)
        : JSON.parse(`${localStorage.getItem(LocalStorageItems.PlanUserInfo)}`)
            .name;
    }
    return '';
  }

  private getPlanUserAvatar(): string {
    if (
      localStorage.getItem(LocalStorageItems.PlanUserInfo) &&
      localStorage.getItem(LocalStorageItems.PlanTokenInfo)
    ) {
      this.isUserLogged$.next(true);
      return JSON.parse(
        `${localStorage.getItem(LocalStorageItems.PlanUserInfo)}`,
      ).name.slice(-3, -2) === '_'
        ? JSON.parse(
            `${localStorage.getItem(LocalStorageItems.PlanUserInfo)}`,
          ).name.slice(-2)
        : '01';
    }
    return '';
  }

  private clearUserData(): void {
    localStorage.removeItem(LocalStorageItems.PlanUserInfo);
    localStorage.removeItem(LocalStorageItems.PlanTokenInfo);
    localStorage.removeItem(LocalStorageItems.PlanTokenExpiredTime);
    this.isUserLogged$.next(false);
  }
}
