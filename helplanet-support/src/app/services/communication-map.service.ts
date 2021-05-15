import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationDTO } from 'src/models/notification.dto';

@Injectable({
  providedIn: 'root'
})
export class CommunicationMapService {
  private communicator = new BehaviorSubject<Partial<NotificationDTO>>(null);

  communicator$ = this.communicator.asObservable();
  
  constructor() { }

  setMap(data:Partial<NotificationDTO>){
    this.communicator.next(data);
  }

}
