import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNotificationPageRoutingModule } from './add-notification-routing.module';

import { AddNotificationPage } from './add-notification.page';
import { LevelComponent } from './level/level.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNotificationPageRoutingModule
  ],
  declarations: [AddNotificationPage, LevelComponent, FormComponent]
})
export class AddNotificationPageModule {}
