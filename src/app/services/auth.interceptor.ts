import {
  HttpEvent,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuthEndpoint =
    req.url.includes('/login') ||
    req.url.includes('/register') ||
    req.url.includes('/refresh');
  if (isAuthEndpoint) {
    return next(req);
  }
  // Always read the latest access token from AuthService for every request
  const getAuthReq = (request: HttpRequest<any>) => {
    const latestToken = authService.getAccessToken();
    return latestToken
      ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${latestToken}`,
          },
        })
      : request;
  };

  return next(getAuthReq(req)).pipe(
    catchError((error: HttpErrorResponse) => {
      // Only handle 401 errors and avoid infinite retry
      if (error.status === 401 && !req.headers.has('X-Retry')) {
        // Mark request as retried
        const retryReq = req.clone({
          headers: req.headers.set('X-Retry', 'true'),
        });

        return authService.refreshToken().pipe(
          switchMap((response: { accessToken: string }) => {
            const newToken = response.accessToken;
            if (newToken) {
              // Always use the latest token for retried request
              return next(getAuthReq(retryReq));
            } else {
              router.navigate(['/login']);
              return throwError(() => error);
            }
          }),
          catchError((refreshErr) => {
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
}
