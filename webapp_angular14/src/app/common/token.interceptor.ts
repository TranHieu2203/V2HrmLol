import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem("token")!;

    if (token && !request.headers.has("skipTokenInterceptor")) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token).delete("skipTokenInterceptor"),
      });
    }

    // if (!request.headers.has("Content-Type")) {
    //   request = request.clone({
    //     headers: request.headers.set("Content-Type", "application/json"),
    //   });
    // }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json"),
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !request.headers.has("skipErrorInterceptor")) {
          this.auth.logout();
          location.reload();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
