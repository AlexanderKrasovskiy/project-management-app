import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenResponseModel, UserModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isUserRegistered$ = new BehaviorSubject<boolean>(false);
  public isUserLogged$ = new BehaviorSubject<boolean>(false);

  public setUser(user: UserModel, name: string): void {
    localStorage.setItem('PlanUserInfo', JSON.stringify(user));
    localStorage.setItem('PlanNameInfo', name.trim());
    this.isUserRegistered$.next(true);
  }

  public setToken(token: TokenResponseModel): void {
    localStorage.setItem('PlanTokenInfo', token.token);
    if (localStorage.getItem('PlanUserInfo')) {
      this.isUserLogged$.next(true);
    }
  }

  public getUser(): string {
    // if (!localStorage.getItem('PlanUserInfo')) {
    //   this.isUserRegistered$.next(false);
    // } else {
    //   this.isUserRegistered$.next(true);
    // }
    // if (!localStorage.getItem('PlanTokenInfo')) {
    //   this.isUserLogged$.next(false);
    // } else {
    //   this.isUserLogged$.next(true);
    // }

    if (
      localStorage.getItem('PlanUserInfo') &&
      localStorage.getItem('PlanTokenInfo')
    ) {
      this.isUserRegistered$.next(true);
      this.isUserLogged$.next(true);
      return localStorage.getItem('PlanNameInfo') as string;
      // return JSON.parse(localStorage.getItem('PlanUserInfo') as string)
      //   .login as string;
    }
    return '';
  }

  public logoutUser(): void {
    localStorage.removeItem('PlanUserInfo');
    localStorage.removeItem('PlanTokenInfo');
    this.isUserLogged$.next(false);
    this.isUserRegistered$.next(false);
  }
}
