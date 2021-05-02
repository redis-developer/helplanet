import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.page.html',
  styleUrls: ['./add-notification.page.scss'],
})

export class AddNotificationPage implements OnInit {
  typeNotif: string;

  constructor(private route: ActivatedRoute) {    
  }

  ngOnInit() {
    this.typeNotif = this.route.snapshot.paramMap.get('type');
  }

  setLevel(ev:any){
    
  }

}
