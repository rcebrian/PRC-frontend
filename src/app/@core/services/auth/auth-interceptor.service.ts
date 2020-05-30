import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    const jwtToken: string = this.token.getToken();

    if (jwtToken) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ jwtToken }`,
          // 'Content-Type': 'application/json'
        }
      });
      // console.log(`tokencito: ${ jwtToken }`)
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        return throwError( err );
      })
    );
  }
}
