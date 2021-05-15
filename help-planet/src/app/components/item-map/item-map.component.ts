import { Component, Input, OnInit } from '@angular/core';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { NotificationDTO } from 'src/app/models/notification.dto';
@Component({
  selector: 'app-item-map',
  templateUrl: './item-map.component.html',
  styleUrls: ['./item-map.component.scss'],
})
export class ItemMapComponent implements OnInit {
  @Input('data') data:NotificationDTO[]=[];
  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const map = new Map('map').setView([33.6396965, -84.4304574], 23);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // const customMarkerIcon = icon({
    //   iconUrl: 'assets/images/custom-marker-icon.png',
    //   iconSize: [64, 64], 
    //   popupAnchor: [0, -20]
    // });

    this.data.forEach((d:NotificationDTO) => {
      marker([this.convertGeo(d).lat, this.convertGeo(d).lon])
      .bindPopup(`<b>${d.situation}</b><p>${d.text}</p>`, { autoClose: false })      
      .addTo(map).openPopup();
    });
  }


          
    convertGeo(d){
        let geoArr = d.geo.split(',');
        let g = {
            lon:Number(geoArr[0]),
            lat:Number(geoArr[1])
        }
        return g;
    }
}
