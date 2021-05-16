import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './components/map/map.component';
import { ItemNotificationComponent } from './components/item-notification/item-notification.component';
import { ItemUserComponent } from './components/item-user/item-user.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackComponent } from './components/snackbar/snack/snack.component';
import { FooterPlanetComponent } from './components/footer-planet/footer-planet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTitleLogoComponent } from './components/app-title-logo/app-title-logo.component';
import { AuthGuard } from './guards/auth.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardOrgComponent } from './pages/dashboard-org/dashboard-org.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ListNotificationComponent } from './components/list-notification/list-notification.component';
import { WebsocketService } from './services/websocket.service';
import { ListUserComponent } from './components/list-user/list-user.component';
import { MatSelectModule } from '@angular/material/select'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MapComponent,
    ItemNotificationComponent,
    ItemUserComponent,
    DashboardAdminComponent,
    SnackComponent,  
    FooterPlanetComponent,
    AppTitleLogoComponent,
    DashboardOrgComponent,
    ListNotificationComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    MatTabsModule,
    MatSnackBarModule,
    MatGridListModule,
    InfiniteScrollModule,
    MatSelectModule,
    FormsModule
  
  ],
  providers: [AuthGuard, WebsocketService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
