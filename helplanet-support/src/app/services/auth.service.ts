import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
const LOGIN_INF = 'login_inf';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  loginState = new BehaviorSubject(false);
  tokenState = new BehaviorSubject(null);
  private _storage:Storage | null = null;


  constructor(
    private storage:Storage,
    private router:Router,
    public toastCtrl:ToastController,
    private userService:UserService,      

  ) {  
       
     
        this.storage.create()
        .then(
          (storage:Storage)=>{
            // create new storage
            this._storage = storage
            // platform ready, verify is login            
            this.isLogin();
          } 
        );            
  
    
    
  }

  // isLogin: verify and emit result
  isLogin(){
    this._storage?.get(LOGIN_INF)
    .then(
      (response)=>{
        if(response){
          // emit true if user is logged in
          this.loginState.next(true);
          this.tokenState.next(response.token);
        }
      }
    );
  }

  // login user in app
  login({email,password}:Partial<Login>){
    // call user service for connect with server
    this.userService.initSession({email,password})
    .subscribe(
      (res:Partial<User>)=>{
        console.log(res);
        this.storage?.set(LOGIN_INF,JSON.stringify(res))
        .then(
          (response)=>{
            // navigate to home
            this.router.navigate(['home']);
            // emit state true for login
            this.loginState.next(true);
          }
        );
      },
      async (err)=>{        
        console.log("Err=>",err);
        let t = await this.createToast(`(${err.status}) - ${err.message}`);
        t.present();
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
        this.storage?.set(LOGIN_INF,JSON.stringify(res))
        .then(
          (response)=>{
            // navigate to home
            this.router.navigate(['home']);
            // emit state true for login
            this.loginState.next(true);
          }
        );
      },
      async (err)=>{        
        console.log("Err=>",err);
        let t = await this.createToast(`(${err.status}) - ${err.message}`);
        t.present();
      }
    );
        
  }

  // logout user
  logout(){
    this.userService.outSession()
    .subscribe(
      ()=>{
        this.storage?.remove(LOGIN_INF)
        .then(
          ()=>{
            // navigate to login
            this.router.navigate(['session']);
            // emit state false for login
            this.loginState.next(false); 
            this.tokenState.next(null);
          }
        );
      }
    );
  }


  // use is authenticated in app
  isAuth(){
    return this.loginState.value;
  }

  getToken(){
    return this.tokenState.value;
  }

  async getStorage(){
    return JSON.parse(await this._storage.get(LOGIN_INF)); 
  }


  private async createToast(data):Promise<HTMLIonToastElement>{
    const toast:HTMLIonToastElement = await this.toastCtrl.create({
      message: data,
      duration: 8000
    });

    return toast;
  }
}
