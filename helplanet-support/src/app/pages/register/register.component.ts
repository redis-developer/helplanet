import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  frmRegister:FormGroup;
  constructor(
    private router:Router,
    private authService:AuthService    
  ) {
    this.frmRegister = this.createForm();
  }

  ngOnInit() {
  }


  createForm():FormGroup{
    return new FormBuilder().group({
      email:['',[Validators.required,Validators.email]],
      username:['',[Validators.required,Validators.maxLength(255)]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(255)]]      
    });
  }

  registerUser(){
    // submit form
    let userData = new User();
    userData.username = this.frmRegister.value.username;
    userData.email = this.frmRegister.value.email;
    userData.password = this.frmRegister.value.password;
    console.log("register",userData);
    //save user
    this.authService.register(userData);    
  }

  goToLogin(){
    this.router.navigate(['session']);
  }

  get f(){
    return this.frmRegister.controls;
  }
}
