import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { NotificationDTO } from 'src/models/notification.dto';
import { PaginationDTO } from 'src/models/pagination.dto';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.css']
})
export class ListNotificationComponent implements OnInit {
  @Input('title') title:string = '';
  @Input('isRealTime') isRealTime:boolean = false;  
  data:Partial<NotificationDTO>[] | null = null;
  userOrg:string = '';
  dataRealTime:Partial<NotificationDTO>[] = [];  
  showButton = true;
  page = 0;
  constructor(
    private notificationService:NotificationService,
    private auth:AuthService,
    private io:WebsocketService
  ) { }
  
  ngOnInit(): void {     
    this.userOrg = this.auth.getStorage() ? this.auth.getStorage().email : '';
    if(this.isRealTime){
      this.getRealTime();
    }
    else{
      this.getNotifications();
    }    
  }


  getNotifications(){
    this.notificationService.listNotification(this.page)
    .subscribe(
      (res:PaginationDTO<Partial<NotificationDTO>>)=>{
        if(this.data==null){
          this.data = [];
        }
        if(res.result.length == 0){
          this.showButton = false;
        }
        this.data = [...this.data,...res.result];
      }
    );
  }

  addData(){
    this.page++;
    this.getNotifications();
  }

  getRealTime(){     
    this.io.listenEvent('new-report')
    .subscribe(
      (data:Partial<NotificationDTO>)=>{                        
        alert("New Notificaton :)");        
        this.dataRealTime.push(data);
      },
      (err)=>{
        console.log(err);
      }
    );        
  }
}
