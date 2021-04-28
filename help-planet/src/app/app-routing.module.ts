import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then( m => m.SessionPageModule)
  },
  {
    path: 'notification-list',
    loadChildren: () => import('./notification-list/notification-list.module').then( m => m.NotificationListPageModule)
  },
  {
    path: 'notification-location',
    loadChildren: () => import('./notification-location/notification-location.module').then( m => m.NotificationLocationPageModule)
  },
  {
    path: 'add-notification/:type',
    loadChildren: () => import('./add-notification/add-notification.module').then( m => m.AddNotificationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
