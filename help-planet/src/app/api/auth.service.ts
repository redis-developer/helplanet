import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

const LOGIN_INF = 'login_inf';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  loginState = new BehaviorSubject(false);
  private _storage:Storage | null = null;


  constructor(
    private storage:Storage,
    private router:Router,
    public toastCtrl:ToastController,
    private platform:Platform,    

  ) {     
    this.platform.ready()
    .then(
      ()=>{        
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
        }
      }
    );
  }

  // login user in app
  login(){
    // TODO call user service for connect with server
    
    let test_res={
      user_id:'555',
      user_name:'test'
    };

    this.storage?.set(LOGIN_INF,test_res)
    .then(
      (response)=>{
        // navigate to home
        this.router.navigate(['home']);
        // emit state true for login
        this.loginState.next(true);
      }
    );
  }

  // logout user
  logout(){
    this.storage?.remove(LOGIN_INF)
    .then(
      ()=>{
        // navigate to login
        this.router.navigate(['session']);
        // emit state false for login
        this.loginState.next(false); 
      }
    );
  }


  // use is authenticated in app
  isAuth(){
    return this.loginState.value;
  }



}
