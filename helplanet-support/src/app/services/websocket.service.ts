import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket:any;
  readonly url = environment.backendURLNotification;
  constructor() {
    this.socket = io.io(this.url);
  }
  
  listenEvent(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data)=>{
        console.log("DATA====",data);
        subscriber.next(data);
      });
    })  
  }
}
