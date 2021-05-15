import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
const LOGIN_INF = 'login_inf';
@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  token:any;

  constructor(private auth: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );
    req = req.clone(
      {
        headers
      }
    );
    
    if (!this.auth.isAuth()) {      
      return next.handle(req)
        .pipe(
          catchError(this.handleError)
        );
    }

    let data = JSON.parse(localStorage.getItem(LOGIN_INF) ?? "{}")
    
    if (data != {}) {      
      this.token = data.token;      
      if (this.token) {        
        req = req.clone({
          setHeaders: {
            'Authorization': `bearer ${this.token}`
          }
        });
      }
    }

    return next.handle(req)
      .pipe(
        catchError(this.handleError)
      );
  }


  // handle error
  private handleError(error: HttpErrorResponse) {
    console.log("ERROR=>", error);
    if(error.status){
      if(error.status==401){    
        localStorage.clear();  
        return throwError(error.message);  
      }      
    }
    if(!error.error.error) {
      console.log("ERROR unknow=>", error.message);
      return throwError(error.message);
    }
    return throwError(error.error.error);
  }
}
