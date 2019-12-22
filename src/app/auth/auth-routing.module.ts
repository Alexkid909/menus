import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {UnauthGuard} from '../shared/guards/unauth.guard';

const authRoutes: Routes = [
  {
    path: 'sign-up',
    component: RegisterComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
