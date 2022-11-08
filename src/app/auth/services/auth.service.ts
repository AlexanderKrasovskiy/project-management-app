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
  // public isUserRegistered$ = new BehaviorSubject<boolean>(false);
  public isUserLogged$ = new BehaviorSubject<boolean>(false);

  public setToken(token: TokenResponseModel): void {
    localStorage.setItem('PlanTokenInfo', token.token);
    //    if (localStorage.getItem('PlanUserInfo')) {

    //   }
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
    this.isUserLogged$.next(false);
    // this.isUserRegistered$.next(false);
  }
}
