import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormNotificationModel } from '../models/formNotification.model';
import { NotificationDTO } from '../models/notification.dto';
import { AuthService } from './auth.service';

const URL_SERVICE = `${environment.backendURLReport}/report`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {  


  constructor(private http:HttpClient, private socket:Socket, private auth:AuthService) {   
  }  


  // create notification
  addNotification({level, text,geo, situation}:Partial<FormNotificationModel>):Observable<any>{    
    return this.http.post(`${URL_SERVICE}/add`,{level,text,geo, situation})
    .pipe(
      catchError(this.handleError('Add Notification'))
    );
  }

  // cancel notification - status change
  cancelNotification(id:string):Observable<any>{
    //TODO
    return this.http.delete(`${URL_SERVICE}/cancel/${id}`)
    .pipe(
      catchError(this.handleError('Cancel Notification'))
    );
    return of()
  }

  listNearNotification(lat:string,lon:string):Observable<NotificationDTO[]>{
    return this.http.get<NotificationDTO[]>(`${URL_SERVICE}/near/${lon}/${lat}`)
    .pipe(
      catchError(this.handleError<NotificationDTO[]>('List Notification'))
    )
  }

  listNotification(page:number){
    return this.http.get<NotificationDTO[]>(`${URL_SERVICE}/list-all/${page}`);
  }

  eventAddNotification(){
    //TODO
    // use sockets for get notifications realtime
    return this.socket.fromEvent('add-notification');
  }

    // handle error
  private handleError<T>(operation = "operation", result?:T){
    return (error:any):Observable<T>=>{
      console.log(error);
      console.log(`${operation} 'Error'=>${error.message}`);

      return of(result as T);

    };
  }

}
