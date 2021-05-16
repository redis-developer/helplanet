import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-planet',
  templateUrl: './footer-planet.component.html',
  styleUrls: ['./footer-planet.component.css']
})
export class FooterPlanetComponent implements OnInit {
  @Input("isSun") isSun:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
