import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/models/login.dto';
import { PaginationDTO } from 'src/models/pagination.dto';
import { User } from 'src/models/user.dto';

const URL_SERVICE = `${environment.backendURLSession}/user`;
const URL_SERVICE_ORG = `${environment.backendURLOrg}/organization`;
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

  listAll(page,email?){
    if(email){
      return this.http.get<PaginationDTO<Partial<User>>>(`${URL_SERVICE}/all/${page}/${email}`);
    }else{
      return this.http.get<PaginationDTO<Partial<User>>>(`${URL_SERVICE}/all/${page}`);
    }
  }

  setRole(email,role){
    
    return this.http.post<Login>(`${URL_SERVICE}/set-role`,{email,role});
  }

}
