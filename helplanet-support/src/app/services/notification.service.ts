import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationDTO } from 'src/models/notification.dto';
import { PaginationDTO } from 'src/models/pagination.dto';
import { AuthService } from './auth.service';
const URL_SERVICE = `${environment.backendURLReport}/report`;
const URL_SERVICE_ORG = `${environment.backendURLOrg}/organization`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient, private auth:AuthService) {   
  }  


  // cancel attention notification - status change
  cancelNotification(id:string):Observable<any>{
    //TODO
    return this.http.post(`${URL_SERVICE_ORG}/cancel-attention/${id}`,{})
    .pipe(
      catchError(this.handleError('Error Cancel Notification'))
    );
  }

  attendNotification(id:string):Observable<any>{
    
    return this.http.post(`${URL_SERVICE_ORG}/attend-notification/${id}`,{})
    .pipe(
      catchError(this.handleError('Error Attend Notification'))
    );
  }


  listNotification(page:number){
    return this.http.get<PaginationDTO<Partial<NotificationDTO>>>(`${URL_SERVICE_ORG}/notifications/${page}`);
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
