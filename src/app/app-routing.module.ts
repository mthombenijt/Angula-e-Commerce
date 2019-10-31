import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { authGuardGuard } from './gaurd/auth-guard.guard';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';
import { MycartComponent } from './mycart/mycart.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateComponent } from './update/update.component';
import { EditComponent } from './edit/edit.component';




const routes: Routes = [
  {path:"",component:ProductdisplayComponent},
  {path:"home",component:HomeComponent,canActivate:[authGuardGuard]},
  {path:"navbar",component:NavbarComponent},
  {path:"update",component:UpdateComponent},
  {path:"profile",component:ProfileComponent,canActivate:[authGuardGuard]},
  {path:"dashboard",component:DashboardComponent,canActivate:[authGuardGuard]},
  {path:"admin",component:AdminComponent,canActivate:[authGuardGuard]},
  {path:"productdisplay",component:ProductdisplayComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"mycart",component:MycartComponent},
  {path:"edit",component:EditComponent},
  {path:"**",component:ProductdisplayComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],declarations: []  
})
export class AppRoutingModule { }
