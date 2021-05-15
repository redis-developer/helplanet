import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/models/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmLogin:FormGroup;

  constructor(
    private authService:AuthService,
    private router:Router    
  ) {
    this.frmLogin = this.createForm();
  }

  ngOnInit() {
  }

  createForm():FormGroup{
    return new FormBuilder().group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(255)]]
      }
    );
  }  

  loginUser(){
    console.log(this.frmLogin);
    //submit form
    let loginData = new Login();
    loginData.email = this.frmLogin.value.email;
    loginData.password = this.frmLogin.value.password;
    //call service for login
    this.authService.login(loginData);
  }

  goToRegister(){    
    this.router.navigate(['register']);    
  }
  

  get f(){
    return this.frmLogin.controls;
  }

}
