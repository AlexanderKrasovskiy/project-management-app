import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {}

  public canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let isUserLoggedValue: boolean = false;
    this.authService.isUserLogged$.subscribe((value) => {
      isUserLoggedValue = value;
    });
    if (isUserLoggedValue === false) {
      this.router.navigate(['/auth/login']);
    }
    return isUserLoggedValue;
  }
}
