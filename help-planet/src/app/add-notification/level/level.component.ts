import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
})
export class LevelComponent implements OnInit {
  @Input() typeNotification:string = 'animal';
  @Output() onSelectLevel:EventEmitter<number> = new EventEmitter<number>();

  level = 0;  
  username = '';
  constructor(private auth:AuthService) {}

  async ngOnInit() {
    console.log(this.typeNotification);
    let data = await this.auth.getStorage();
    this.username = data.username;
  }

  selectLevel(val:number){ 
    this.level = val;   
    this.onSelectLevel.emit(val);
  }
  

}
