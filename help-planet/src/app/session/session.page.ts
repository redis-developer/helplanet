import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  loginUser(){
    this.authService.login();
  }

}
