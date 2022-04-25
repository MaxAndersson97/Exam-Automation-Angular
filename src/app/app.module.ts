import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication/authentication.service';
import { CommonsModule } from './commons/commons.module';
import { TestComponent } from './test/test.component';
import { TokenInterceptor } from './token.interceptor';
import { NgHttpLoaderModule } from 'ng-http-loader'; //for http loader
import { Spinkit } from 'ng-http-loader'; //for diffrent kinds of loader gif
import { PapaParseModule } from 'ngx-papaparse'; //for csv parser
import { DatePipe } from '@angular/common';
import { ClickOutsideDirective } from './Utils/click-outside.directive';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        TestComponent,
        ClickOutsideDirective
    ],
    imports: [
        CommonsModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule, 
        SharedModule,
        
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            onActivateTick: true
        }),        
        NgHttpLoaderModule.forRoot(),
        PapaParseModule
    ],
    providers: [AuthenticationService, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }, DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { 
    public spinkit = Spinkit;
}
