import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {AuthGuard} from '../app/guards/auth.guard';
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'authentication',
  //   pathMatch: 'full'
  // },
  {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'welcome',
    loadChildren: './welcome/welcome.module#WelcomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'exam',
    loadChildren: './layout/layout.module#LayoutModule',
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  {
    path: '**',
    redirectTo: 'authentication'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,{ useHash: true,
     
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
