import { TitleLogoComponent } from './../components/title-logo/title-logo.component';
import { FooterPlanetComponent } from './../components/footer-planet/footer-planet.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionPageRoutingModule } from './session-routing.module';

import { SessionPage } from './session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SessionPageRoutingModule
  ],
  declarations: [SessionPage, FooterPlanetComponent, TitleLogoComponent]
})
export class SessionPageModule {}
