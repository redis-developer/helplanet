import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { MENU, NotificationDTO } from 'src/models/notification.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../snackbar/snack/snack.component';
import { GRAVITY } from 'src/models/formNotification.model';
import { CommunicationMapService } from 'src/app/services/communication-map.service';


@Component({
  selector: 'app-item-notification',
  templateUrl: './item-notification.component.html',
  styleUrls: ['./item-notification.component.css']
})
export class ItemNotificationComponent implements OnInit {
  @Input('data') data:Partial<NotificationDTO>;  
  @Input('userOrg') userOrg:string = ''; 

  constructor(
    private notificationService:NotificationService ,  
    private _snackBar: MatSnackBar,
    private communicatorMap:CommunicationMapService
  ) { }

  ngOnInit(): void {       
  }
  
  cancel(){      
    this.notificationService.cancelNotification(this.data.id)
    .subscribe(
      (res)=>{
        console.log(res);
        this.data.userOrg=null;
        this._snackBar.openFromComponent(SnackComponent, {
          duration: 5*1000,
          data:"Successfully canceled "
        });
      },  
      (err)=>{
        this._snackBar.openFromComponent(SnackComponent, {
          duration: 5*1000,
          data:err.message
        });
      }
    )
  }

  attend(){
    this.notificationService.attendNotification(this.data.id)
    .subscribe(
      (res)=>{
        console.log(res);
        this.data.userOrg=this.userOrg;
        this._snackBar.openFromComponent(SnackComponent, {
          duration: 5*1000,
          data:"Successfully attended "
        });
      },  
      (err)=>{
        this._snackBar.openFromComponent(SnackComponent, {
          duration: 5*1000,
          data:err.message
        });
      }
    )
  }
    
  goToMap(){
    console.log("go to map");
    this.communicatorMap.setMap(this.data); 
  }

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
        return null;        
    }
  } 
  

}
