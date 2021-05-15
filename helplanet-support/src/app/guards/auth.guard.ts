import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private route:Router
  ) { }
  canActivate(): boolean {
      if(this.authService.isAuth()){
        return true;
      }      
      this.route.navigate(['/session']).then(_ => false);

      return false;
  }
  
}
