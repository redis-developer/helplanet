import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowNotificationPageRoutingModule } from './show-notification-routing.module';

import { ShowNotificationPage } from './show-notification.page';
import { ItemMapComponent } from '../components/item-map/item-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowNotificationPageRoutingModule
  ],
  declarations: [ShowNotificationPage, ItemMapComponent]
})
export class ShowNotificationPageModule {}
