import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginRequestModel, RegisterRequestModel } from '../models/auth.model';
import { ApiHelpersService } from './api-helpers.service';

@Injectable()
export class ApiControlService {
  constructor(private apiHelpers: ApiHelpersService) {}

  loginUp(user: RegisterRequestModel): void {
    this.apiHelpers
      .regicter(user)
      .pipe(
        tap((results) => localStorage.setItem('USER', JSON.stringify(results))),
      )
      .subscribe();
  }

  loginIn(user: LoginRequestModel): void {
    this.apiHelpers
      .login(user)
      .pipe(tap((results) => localStorage.setItem('TOKEN', results.token)))
      .subscribe();
  }
}
