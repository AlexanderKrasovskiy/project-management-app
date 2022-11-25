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
import { isTokenExpired } from 'src/app/auth/utils/token-life.util';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageItems } from 'src/app/shared/models/common.model';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private apiUrl: string = 'https://rs-kanban.herokuapp.com';
  // private apiUrl: string = 'https://app-rss-production.up.railway.app';

  constructor(public authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/assets')) return next.handle(request);

    if (isTokenExpired()) {
      localStorage.setItem(LocalStorageItems.PlanTokenInfo, 'expired');
    }

    return next
      .handle(
        request.clone({
          url: this.apiUrl + request.url,
          headers: new HttpHeaders({
            accept: 'application/json',
            Authorization:
              `Bearer ${localStorage.getItem(
                LocalStorageItems.PlanTokenInfo,
              )}` || '',
          }),
        }),
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.authService.logoutUser();
            localStorage.setItem(LocalStorageItems.PlanTokenInfo, 'expired');
            this.router.navigate(['welcome']);
            return EMPTY;
          }
          return throwError(() => error);
        }),
      );
  }
}
