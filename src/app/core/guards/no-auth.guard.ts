import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let isUserLoggedValue!: boolean;
    this.authService.isUserLogged$.subscribe((value) => {
      isUserLoggedValue = value;
    });
    if (isUserLoggedValue === true) {
      this.router.navigate(['boards']);
    }
    return !isUserLoggedValue;
  }
}
