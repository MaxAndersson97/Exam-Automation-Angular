import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyotpComponent } from './verifyotp/verifyotp.component';
import { AboutUsComponent } from '../commons/about-us/about-us.component';
import { CreateOnlineExamPapersWorksheetComponent } from '../commons/create-online-exam-papers-worksheet/create-online-exam-papers-worksheet.component';
import { PrivacyPolicyComponent } from '../commons/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verifyotp',
    component: VerifyotpComponent
  },
  {path:"about-us", component:AboutUsComponent},
  
  {path:"privacy-policy", component:PrivacyPolicyComponent},
  {path:"terms-conditions", component:PrivacyPolicyComponent},
  {path:"returns-refunds-cancellation-policy", component:PrivacyPolicyComponent},
  {path:"product-service-purchase-flow", component:CreateOnlineExamPapersWorksheetComponent},
  {path:"product-service-cataloge", component:CreateOnlineExamPapersWorksheetComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
