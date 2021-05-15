import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';
import { NotificationService } from '../api/notification.service';
@Component({
  selector: 'app-notification-location',
  templateUrl: './notification-location.page.html',
  styleUrls: ['./notification-location.page.scss'],
})
export class NotificationLocationPage implements OnInit {
  currentcoors;
  data=null;
  constructor(
    private geolocation: Geolocation,
    private notificationService:NotificationService,
    private toastCtrl:ToastController
  ) {}

  ngOnInit() {
    this.getPosition();
  }

  getPosition(){
    this.geolocation.getCurrentPosition({
      timeout:10000,
      enableHighAccuracy:true
    }).then((resp) => {
      this.currentcoors = [resp.coords.latitude,resp.coords.longitude]      
      console.log("current coors",this.currentcoors);
      this.notificationService.listNearNotification(this.currentcoors[0],this.currentcoors[1])
      .subscribe(
        (res)=>{
          console.log("result near",res);
          this.data = res;
        },
        async (err)=>{
          console.log(err);
          let t = await this.createToast(`(${err.status}) ${err.message}`);
          t.present();
        }
      );
     }).catch(async (error) => {
       console.log('Error getting location', error);
       let t = await this.createToast(`${error}`);
        t.present(); 
     });
  }

  private async createToast(data): Promise<HTMLIonToastElement> {
    const toast: HTMLIonToastElement = await this.toastCtrl.create({
      message: data,
      duration: 8000
    });

    return toast;
  }
}
