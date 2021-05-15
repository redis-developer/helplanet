import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationLocationPageRoutingModule } from './notification-location-routing.module';

import { NotificationLocationPage } from './notification-location.page';
import { ItemMapComponent } from '../components/item-map/item-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationLocationPageRoutingModule
  ],
  declarations: [NotificationLocationPage, ItemMapComponent]
})
export class NotificationLocationPageModule {}
