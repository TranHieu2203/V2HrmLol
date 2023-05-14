import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // Get the auth token from the service.
        const authToken = this.auth.getAuthorizationToken();

        if (authToken === undefined) {
            console.log(`AuthInterceptor.intercept() for ${req.url}`, "No authToken" )
            return next.handle(req);
        }

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });

        console.log(`AuthInterceptor.intercept() for ${req.url}`, "passed" )

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}