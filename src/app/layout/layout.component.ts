import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from '../commons/loader/loader.service';
import { LoaderState } from '../commons/loader/loader-state';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, map } from 'rxjs/operators';
import { MatDrawer } from '@angular/material';
import { NavigationStart, Router } from '@angular/router';
import { BuyCreditComponent } from '../commons/buy-credit/buy-credit.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NavBarComponent } from '../commons/nav-bar/nav-bar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls:['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('OutOfCreditDialogTemplate') OutOfCreditDialog: ModalDirective;
  @ViewChild(NavBarComponent) appNavBar: NavBarComponent;
    @ViewChild(BuyCreditComponent) appBuyCredit: BuyCreditComponent | undefined;

  show = false;
  isSmallScreen$: Observable<boolean>;
  isshowheader:boolean = true;

  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private spinner: SpinnerVisibilityService,
    private bpObs: BreakpointObserver,
    private router: Router) {

      this.isSmallScreen$ = this.bpObs
        .observe('(max-width: 991px)')
        .pipe(map(bpState => bpState.matches));

  }

  ngOnInit() {
    this.spinner.hide();
    // this.subscription = this.loaderService.loaderState
    //   .subscribe((state: LoaderState) => {
    //     this.show = state.show;
    //   });
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

  openSidenav() {
    console.log(document.querySelector('#sidebar-wrapper'));
  }

  showPaymentPopUp(){
    this.openWorksheetModal1();
  }

  
public openWorksheetModal1(){
    this.appBuyCredit.loadCredits();
    this.OutOfCreditDialog.show();
}
changePwd(){
  this.appNavBar.openresetpassword();
}

closeModalOutOfCredit(event){
    this.OutOfCreditDialog.hide();
    if(event)
    this.appBuyCredit.proceedPayment(event.amount,event.currency);
 }

}