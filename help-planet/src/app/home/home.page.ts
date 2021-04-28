import { MENU } from './menu/menu.component';
import { Component } from '@angular/core';
import MenuObjModel from '../models/menuobj.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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
  constructor() {}

}
