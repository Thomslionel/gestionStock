import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { Auth } from '../services/auth';
import { Token } from '../services/token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(

    private tokenService: Token,

    private authService: Auth

  ) { }

  intercept(

    req: HttpRequest<any>,

    next: HttpHandler

  ): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();

    let request = req;

    if (token) {

      request = req.clone({

        setHeaders: {

          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"

        }

      });

    } else {

      request = req.clone({

        setHeaders: {

          "ngrok-skip-browser-warning": "true"

        }

      });

    }

    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {

        if (

          error.status === 401 &&

          !req.url.includes("/auth/refresh")

        ) {

          const refresh = this.tokenService.getRefreshToken();

          if (!refresh) {

            this.tokenService.clear();

            return throwError(() => error);

          }

          return this.authService.refresh(refresh).pipe(

            switchMap((response) => {

              this.tokenService.save(

                response.data.bearer,

                response.data.refresh

              );

              const newRequest = req.clone({

                setHeaders: {

                  Authorization: `Bearer ${response.data.bearer}`

                }

              });

              return next.handle(newRequest);

            }),

            catchError((e) => {

              this.tokenService.clear();

              return throwError(() => e);

            })

          );

        }

        return throwError(() => error);

      })

    );

  }

}