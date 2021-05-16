import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NotificationService } from 'src/app/api/notification.service';
import { MENU } from 'src/app/home/menu/menu.component';
import { GRAVITY } from 'src/app/models/formNotification.model';
import { NotificationDTO } from 'src/app/models/notification.dto';
import { NotificationListPage } from 'src/app/notification-list/notification-list.page';

@Component({
  selector: 'app-item-notification',
  templateUrl: './item-notification.component.html',
  styleUrls: ['./item-notification.component.scss'],
})
export class ItemNotificationComponent implements OnInit {
  @Input('data') notification:NotificationDTO;
  @Input('index') index:number;
  @Output('onRemove') removeEmiter:EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private route:Router,
    private notificationService:NotificationService,
    private toastCtrl:ToastController    
  ) { }

  ngOnInit() {}

  getImage(level:GRAVITY,situation:MENU){

    let _level = level == GRAVITY.YELLOW ? 2 : level == GRAVITY.ORANGE ? 1 : level == GRAVITY.RED ? 3 : null;
    switch (situation) {
      case MENU.animal:
        
        return 'animalColor'+_level + '.png';
      case MENU.contamination:
      
        return 'cont'+_level + '.png';
      case MENU.delinquency:
      
        return 'del'+_level + '.png';
      case MENU.garbage:
      
        return 'garbage'+_level + '.png';
      default:
        break;
    }
  } 
  
  
  goToMap(){
    console.log("got map");
    this.route.navigate(['show-notification',JSON.stringify(this.notification)])
  }

  remove(){    
    if(this.index!=null){            
      this.notificationService.cancelNotification(this.notification.id)
      .subscribe(
        async (res)=>{  
          this.removeEmiter.emit(this.index);                  
          let t = await this.createToast(`Notification removed`);
          t.present();            
        },
        async (err)=>{
          let t = await this.createToast(`(${err.status}) ${err.message}`);
          t.present(); 
        }
      );
    }
  }


  private async createToast(data):Promise<HTMLIonToastElement>{
    const toast:HTMLIonToastElement = await this.toastCtrl.create({
      message: data,
      duration: 8000
    });

    return toast;
  }
}
