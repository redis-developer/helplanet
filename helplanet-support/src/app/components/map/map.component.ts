import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NotificationDTO } from 'src/models/notification.dto';
import { Map, tileLayer, marker, icon, Marker } from 'leaflet';
import { CommunicationMapService } from 'src/app/services/communication-map.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input('title') title:string = '';
  data:Partial<NotificationDTO>[] = [];
  map:Map;
  currentmarker:Marker;
  constructor(
    private communicatorMap:CommunicationMapService
  ) {}

  ngOnInit() {
    this.getDataMap(); 
    this.map = this.initMap();      
  }



  initMap() {
    let map = new Map('map').setView([33.6396965, -84.4304574], 23);    
    console.log("dad");        
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    return map;
  }

  getDataMap(){
    this.communicatorMap.communicator$.subscribe(
      (data:Partial<NotificationDTO>)=>{
        console.log(data,"DATA");
        this.data = [];        
        if(data!=null)
        {
          console.log("DATA---");
          this.data.push(data);        
          if(this.data.length != 0)
          {
            if(this.currentmarker) this.currentmarker.remove();
            this.data.forEach((d:NotificationDTO) => {
            this.currentmarker = marker([
              d.lat ? Number(d.lat) : this.convertGeo(d).lat, 
              d.lon ? Number(d.lon) : this.convertGeo(d).lon, 
            ])
            .bindPopup(`<b>${d.situation}</b><p>${d.text}</p>`, { autoClose: false })      
            .addTo(this.map).openPopup();
                    });
          }    
        }        
      }
    );
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
