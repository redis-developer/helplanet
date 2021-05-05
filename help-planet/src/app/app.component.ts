import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform:Platform,
    private authService:AuthService,
    private router:Router
  ) {
    this.initApp();
  }

  initApp(){
    this.platform.ready()
    .then(
      ()=>{
        this.authService.loginState.subscribe(
          (state)=>{
            if(state){
              this.router.navigate(['home']);
            }else{
              this.router.navigate(['session']);
            }
          }
        )
      }
    )
  }
}
