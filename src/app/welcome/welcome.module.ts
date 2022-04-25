import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { CommonsModule } from '../commons/commons.module';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { Spinkit } from 'ng-http-loader'; //for diffrent kinds of loader gif

@NgModule({
  imports: [
    CommonModule,
    CommonsModule,
    WelcomeRoutingModule,
    NgHttpLoaderModule.forRoot(),
  ],
  declarations: [
    WelcomeComponent
  ],
})
export class WelcomeModule { public spinkit = Spinkit;}
