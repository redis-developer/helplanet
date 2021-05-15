import { MENU } from './menu/menu.component';
import { Component, OnInit } from '@angular/core';
import MenuObjModel from '../models/menuobj.model';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  menuArr:MenuObjModel[] = [
    {
      name:'Report an animal',
      path:MENU.animal,
      icon:'icon-animal.png'
    },
    {
      name:'Place with trash',
      path:MENU.garbage,
      icon:'icon-basura.png'
    },
    {
      name:'Report contamination',
      path:MENU.contamination,
      icon:'icon-cont.png'
    },
    {
      name:'Delinquency/dangerous place',
      path:MENU.delinquency,
      icon:'icon-del.png'
    }
  ];

  username = '';

  constructor(
    private authService:AuthService,
    private route:Router
  ) {}

  async ngOnInit(){
    let data = await this.authService.getStorage();
    this.username = data.username;
  }

  logoutUser(){
    this.authService.logout();
  }


  goTo(url){
    this.route.navigate([url]);
  }

  

}
