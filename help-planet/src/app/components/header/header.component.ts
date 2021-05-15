import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {  
  isActive = false;
  constructor(
    private location: Location,
    private route:Router
  ) { }

  ngOnInit() {    
  }

  back(){
    this.route.navigate(['home'],{replaceUrl:true});
  }

}
