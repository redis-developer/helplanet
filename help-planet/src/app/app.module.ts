import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './api/auth.service';
import { AuthGuardService } from './api/auth-guard.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { TokenService } from './interceptors/token.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


const ioConfig: SocketIoConfig = {
  url: `${environment.backendURLNotification}`,
  options: {}
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), SocketIoModule.forRoot(ioConfig), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [AuthService, AuthGuardService, Geolocation, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenService,
    multi: true
  }, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
