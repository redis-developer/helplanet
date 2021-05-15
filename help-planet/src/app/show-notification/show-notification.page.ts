import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationDTO } from '../models/notification.dto';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.page.html',
  styleUrls: ['./show-notification.page.scss'],
})
export class ShowNotificationPage implements OnInit {
  data:NotificationDTO[] = [];
  constructor(
    private activateRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.data.push(JSON.parse(this.activateRoute.snapshot.paramMap.get("data")));
  }

}
