import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';
import { NotificationService } from 'src/app/api/notification.service';
import { MENU } from 'src/app/home/menu/menu.component';
import { FormNotificationModel, GeoModel } from 'src/app/models/formNotification.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() level: number = 0;
  @Input() situation: MENU = MENU.animal;


  data: FormNotificationModel;
  textData: string;

  constructor(
    private notificationService: NotificationService,
    public toastCtrl: ToastController,
    private geolocation: Geolocation
  ) {
    this.data = new FormNotificationModel();
  }

  ngOnInit() {

  }

  getIdUser() {
    return '0';
  }

  getCurrentGeo(): GeoModel {
    return {
      lat: "-0.937195", lon: "-78.603299"
    }

  }



  sendNotification() {
    this.geolocation.getCurrentPosition(
      {
        timeout:10000,
        enableHighAccuracy:true
      }
    ).then((resp) => {      
      this.data.level = this.level ?? 0;
      this.data.text = this.textData;
      this.data.situation = this.situation;
      this.data.geo ={
        lat:resp.coords.latitude.toString(), 
        lon:resp.coords.longitude.toString()
      };

      //TODO call service for add notification
      this.notificationService.addNotification(this.data)
        .subscribe(
          async (res) => {
            console.log(res);
            let t = await this.createToast(`Notification sended`);
            t.present();

          },
          async (err) => {
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
