import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './api/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',    
  },
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then( m => m.SessionPageModule)
  },
  {
    path: 'notification-list',
    loadChildren: () => import('./notification-list/notification-list.module').then( m => m.NotificationListPageModule),
    canActivate:[AuthGuardService]    
  },
  {
    path: 'notification-location',
    loadChildren: () => import('./notification-location/notification-location.module').then( m => m.NotificationLocationPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'add-notification/:type',
    loadChildren: () => import('./add-notification/add-notification.module').then( m => m.AddNotificationPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'show-notification/:data',
    loadChildren: () => import('./show-notification/show-notification.module').then( m => m.ShowNotificationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
