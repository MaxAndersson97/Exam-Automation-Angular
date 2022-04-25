import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';
import { TokenInterceptor } from '../token.interceptor';
import { CommonsModule } from '../commons/commons.module';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { Spinkit } from 'ng-http-loader';
import { RegisterComponent } from './register/register.component';
import { VerifyotpComponent } from './verifyotp/verifyotp.component'; //for diffrent kinds of loader gif
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule,
    CommonsModule
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, RegisterComponent, VerifyotpComponent],
  providers: [
    LoginService,
    ForgotPasswordService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthenticationModule { 
  public spinkit = Spinkit;
}
