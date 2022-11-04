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
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private apiUrl: string = 'https://rs-kanban.herokuapp.com';
  private token = localStorage.getItem('TOKEN');

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/assets')) return next.handle(request);
    return next
      .handle(
        request.clone({
          url: this.apiUrl + request.url,
          headers: new HttpHeaders({
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}` || '',
          }),
        }),
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            // this.store.dispatch(UserAction.ClearData());
          }

          return throwError(() => new Error('test'));
        }),
      );
  }
}
