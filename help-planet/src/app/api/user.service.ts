import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.dto';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Login } from '../models/login.dto';
const URL_SERVICE = `${environment.backendURLSession}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register(user:Partial<User>):Observable<any>{
    // call server route for register
    return this.http.post<User>(`${URL_SERVICE}/register`,user);
  }

  initSession(login:Partial<Login>):Observable<Login>{
    console.log("dat",login);
    // call server route for login
    return this.http.post<Login>(`${URL_SERVICE}/login`,login);
  }  

  outSession(){
    // call server route for out
    return this.http.get(`${URL_SERVICE}/logout`);
  }

  
}
