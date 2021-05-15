import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NotificationService } from '../api/notification.service';
import { NotificationDTO } from '../models/notification.dto';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.page.html',
  styleUrls: ['./notification-list.page.scss'],
})
export class NotificationListPage implements OnInit {

  page = 0;
  data = [];
  constructor(
    private notificationService:NotificationService,
    private toastCtrl:ToastController
  ) { }

  ngOnInit() {    
    this.getData();
  }

  addPage(e){
    this.page++;
    this.getData(e);
  }

  getData(e=null){
    this.notificationService.listNotification(this.page)
    .subscribe(
      async (data:NotificationDTO[])=>{        
        if(data.length==0 && e!=null)
        {
          e.target.complete();
          return;
        }
        this.data = [...this.data,...data];        
        console.log("data",this.data);
        if(e!=null)
          e.target.complete();
        
      },
      async (err)=>{ 
        if(e!=null)       
          e.target.complete();
        
        console.log(err);
        let t = await this.createToast(`(${err.status}) ${err.message}`);
        t.present(); 
      }
    );
  }

  removeItem(e){    
    this.data.splice(e,1);    
  }

  private async createToast(data):Promise<HTMLIonToastElement>{
    const toast:HTMLIonToastElement = await this.toastCtrl.create({
      message: data,
      duration: 8000
    });

    return toast;
  }


}
