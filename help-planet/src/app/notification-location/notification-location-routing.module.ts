import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationLocationPage } from './notification-location.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationLocationPageRoutingModule {}
