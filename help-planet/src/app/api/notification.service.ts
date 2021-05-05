import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormNotificationModel } from '../models/formNotification.model';

const URL_SERVICE = `${environment.backendURL}notification`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient, private socket:Socket) { }  

  // create notification
  addNotification(formNotification:FormNotificationModel):Observable<any>{
    return this.http.post(`${URL_SERVICE}/add`,formNotification,this.httpHeader)
    .pipe(
      catchError(this.handleError('Add Notification'))
    );
  }

  // cancel notification - status change
  cancelNotification(id:string):Observable<any>{
    
    return this.http.put(`${URL_SERVICE}/cancel`,this.httpHeader)
    .pipe(
      catchError(this.handleError('Cancel Notification'))
    );
  }

  listNotification(page:number,lat:string,lon:string):Observable<FormNotificationModel[]>{
    return this.http.get<FormNotificationModel[]>(`${URL_SERVICE}/list/${page}/${lat}/${lon}`,this.httpHeader)
    .pipe(
      catchError(this.handleError<FormNotificationModel[]>('List Notification'))
    )
  }

  eventAddNotification(){
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
