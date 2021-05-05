import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.dto';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Login } from '../models/login.dto';
const URL_SERVICE = `${environment.backendURL}user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  register(user:User):Observable<any>{
    // call server route for register
    return this.http.post<User>(`${URL_SERVICE}/register`,user,this.httpHeader)
    .pipe(
      catchError(this.handleError('Register User'))
    );
  }

  initSession(login:Login):Observable<Login>{
    // call server route for login
    return this.http.post<Login>(`${URL_SERVICE}/login`,login,this.httpHeader)
    .pipe(
      catchError(this.handleError<Login>('Login User'))
    );
  }  

  // handle error
  private handleError<T>(operation = "operation", result?:T){
    return (error:any):Observable<T>=>{
      console.log(error);
      console.log(`${operation} 'Error'=>${error.message}`);

      return of(result as T);

    };
  }
  
}
