import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { TitleLogoComponent } from '../components/title-logo/title-logo.component';
import { FooterPlanetComponent } from '../components/footer-planet/footer-planet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterPage, TitleLogoComponent, FooterPlanetComponent]
})
export class RegisterPageModule {}
