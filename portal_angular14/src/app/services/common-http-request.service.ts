import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, last, map, tap, retry } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
})

@Injectable({
  providedIn: 'root'
})
export class CommonHttpRequestService {

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('CommonHttpRequestService');
  }

  makePostRequest(name: string, fullUrl: string, payload: any): Observable<any> {
    return this.http.post<any>(fullUrl, payload, {
      headers: headers, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(

        retry(3),

        tap({
          subscribe: () => console.log(`tap subscribe ${name}`),
          next: value => console.log(`tap next ${name}`),
          error: (err) => console.log(`tap error ${name}: ${err.message}`),
          complete: () => console.log(`tap complete ${name}`),
          unsubscribe: () => console.log(`tap unsubscribe ${name}`),
          finalize: () => console.log(`tap finalize ${name}`),
        }),

        /*===========================================================*
        IMPORTANT
        following map operator returns request response to caller
        if it was without return, caller's response would be undefined
        alternative code style: map(response => { return response })
        */
        map(response => response),

        /*===========================================================*/

        last(), // :void return last (completed) message to caller

        catchError(this.handleError(name))
      )
  }

  makeGetRequest(name: string, fullUrl: string): Observable<any> {
    return this.http.get<any>(fullUrl, {
      headers: headers, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(

        retry(3),

        tap({
          subscribe: () => console.log(`tap subscribe ${name}`),
          next: value => console.log(`tap next ${name}`),
          error: (err) => console.log(`tap error ${name}: ${err.message}`),
          complete: () => console.log(`tap complete ${name}`),
          unsubscribe: () => console.log(`tap unsubscribe ${name}`),
          finalize: () => console.log(`tap finalize ${name}`),
        }),

        /*===========================================================*
        IMPORTANT
        following map operator returns request response to caller
        if it was without return, caller's response would be undefined
        alternative code style: map(response => { return response })
        */
        map(response => response),

        /*===========================================================*/

        last(), // :void return last (completed) message to caller

        catchError(this.handleError(name))
      )
  }

}