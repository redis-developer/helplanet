import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login } from 'src/models/login.dto';
import { User } from 'src/models/user.dto';
import { SnackComponent } from '../components/snackbar/snack/snack.component';
import { UserService } from './user.service';
const LOGIN_INF = 'login_inf';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  loginState = new BehaviorSubject(false);
  tokenState = new BehaviorSubject(null);  


  constructor(    
    private router:Router,    
    private userService:UserService,        
    private _snackBar: MatSnackBar
  ) {  
       
        
    this.isLogin();        
  
    
    
  }

  // isLogin: verify and emit result
  isLogin(){
    let data = localStorage.getItem(LOGIN_INF);
    if(data){
      // emit true if user is logged in
      this.loginState.next(true);
      this.tokenState.next(JSON.parse(data).token);
    }
  }

  // login user in app
  login({email,password}:Partial<Login>){
    // call user service for connect with server
    this.userService.initSession({email,password})
    .subscribe(
      (res:Partial<User>)=>{
        console.log(res);        
        localStorage.setItem(LOGIN_INF,JSON.stringify(res))                  
        // navigate to dashboard
        this.router.navigate(['dashboard']);
        // emit state true for login
        this.loginState.next(true);
                  
      },
      async (err:any)=>{        
        console.log("Err=>",err);
        if(!err.status)
        {
          this.openSnackBar(`${err}`);        
        }else{
          this.openSnackBar(`(${err.status}) - ${err.message}`);        
        }
      }
    );
        
  }


  // login user in app
  register({email,username,password}:Partial<User>){
    // call user service for connect with server
    this.userService.register({email,username,password})
    .subscribe(
      (res:Partial<User>)=>{
        console.log(res);
        localStorage.setItem(LOGIN_INF,JSON.stringify(res))
        // navigate to dashboard
        this.router.navigate(['dashboard']);
        // emit state true for login
        this.loginState.next(true);
      },
      async (err)=>{        
        console.log("Err=>",err);
        if(!err.status)
        {
          this.openSnackBar(`${err}`);        
        }else{
          this.openSnackBar(`(${err.status}) - ${err.message}`);        
        }
      }
    );
        
  }

  // logout user
  logout(){
    this.userService.outSession()
    .subscribe(
      ()=>{
        localStorage.removeItem(LOGIN_INF)
        // navigate to login
        this.router.navigate(['session']);
        // emit state false for login
        this.loginState.next(false); 
        this.tokenState.next(null);
      }
    );
  }

  removeStorage(){
    localStorage.removeItem(LOGIN_INF)
  }


  // use is authenticated in app
  isAuth(){
    return this.loginState.value;
  }

  getToken(){
    return this.tokenState.value;
  }

  getStorage(){
    return JSON.parse(localStorage.getItem(LOGIN_INF)); 
  }


  openSnackBar(message) {    
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 5*1000,
      data:message
    });
  }
}
