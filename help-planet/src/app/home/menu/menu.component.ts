import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import MenuObjModel from 'src/app/models/menuobj.model';

export enum MENU{
  animal = 'animal',
  contamination = 'contamination',
  garbage = 'garbage',
  delinquency = 'delinquency'
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() menuobj:MenuObjModel;
  constructor(private router: Router) {}

  ngOnInit() {}

  // redirect to menu page
  goToPath(type:string){
    this.router.navigate(['/add-notification',type])
  }

}
