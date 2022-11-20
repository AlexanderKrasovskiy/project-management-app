import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { isTokenExpired } from 'src/app/pages/auth/utils/token-life.util';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  // private apiUrl: string = 'https://rs-kanban.herokuapp.com';
  private apiUrl: string = 'https://app-rss-production.up.railway.app';

  constructor(private router: Router, public authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/assets')) return next.handle(request);

    if (isTokenExpired()) {
      // this.authService.logoutUser();
      localStorage.setItem('PlanTokenInfo', 'expired');
      // this.router.navigate(['welcome']);
    }

    return next
      .handle(
        request.clone({
          url: this.apiUrl + request.url,
          headers: new HttpHeaders({
            accept: 'application/json',
            // 'Content-Type': 'application/json',
            Authorization:
              `Bearer ${localStorage.getItem('PlanTokenInfo')}` || '',
          }),
        }),
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.authService.logoutUser();
            localStorage.setItem('PlanTokenInfo', 'expired');
            this.router.navigate(['welcome']);
            return EMPTY;
            // console.log(111);
            // this.store.dispatch(UserAction.ClearData());
          }
          // console.error('my error', error);
          return throwError(() => error);
        }),
      );
  }
}
