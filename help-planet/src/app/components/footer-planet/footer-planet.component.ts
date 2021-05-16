import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-planet',
  templateUrl: './footer-planet.component.html',
  styleUrls: ['./footer-planet.component.scss'],
})
export class FooterPlanetComponent implements OnInit {
  @Input("isSun") isSun:boolean = false;
  constructor() { }

  ngOnInit() {}

}
