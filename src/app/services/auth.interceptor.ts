import {
  HttpEvent,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const router = inject(Router);

  const isAuthEndpoint =
    req.url.includes('/login') || req.url.includes('/register');
  if (isAuthEndpoint) {
    return next(req);
  }
  const token = localStorage.getItem('accessToken');
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
