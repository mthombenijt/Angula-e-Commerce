import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule,Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';
import { MycartComponent } from './mycart/mycart.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateComponent } from './update/update.component';
import { FooterComponent } from './footer/footer.component';
import { ProductService } from './Services/product.service';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AdminComponent,
    DashboardComponent,
    ProductdisplayComponent,
    MycartComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    UserheaderComponent,
    NavbarComponent,
    UpdateComponent,
    FooterComponent,
    EditComponent,
   
 
  ],
  imports: [
    BrowserModule,NgbModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
