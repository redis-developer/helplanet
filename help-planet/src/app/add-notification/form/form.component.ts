import { Component, Input, OnInit } from '@angular/core';
import { MENU } from 'src/app/home/menu/menu.component';
import { FormNotificationModel, GeoModel } from 'src/app/models/formNotification.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() level:number = 0; 
  @Input() situation:MENU = MENU.animal; 
  

  data:FormNotificationModel;  
  textData:string;

  constructor() { 
    this.data = new FormNotificationModel();
  }

  ngOnInit() {

  }  

  getIdUser(){
    return '0';
  }

  getCurrentGeo():GeoModel{
    return {
      lat:'o',
      lon:'o'
    }
  }

  sendNotification(){
    this.data.level = this.level ?? 0;    
    this.data.text = this.textData;
    this.data.idUser = this.getIdUser();
    this.data.situation = this.situation;
    this.data.geo = this.getCurrentGeo();
    
    //TODO call service for add notification
    
    
  }

}
