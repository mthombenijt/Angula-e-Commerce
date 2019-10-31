import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IAlert } from 'src/app/Models/IAlert';
import { SharedService } from 'src/app/Services/shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from 'src/app/Services/Registration.Service';
import { Registration } from 'src/app/Models/User.Models';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  closeResult: string;
  loginForm:FormGroup;
  registrationInputs: Registration[];
  currentUser: Registration[];
  isLoggedIn:boolean=false;

 
  loading = false;
  submitted = false;
  returnUrl: string;

  cartItemCount:number=0;
  approvalText:string="";

  @Input()
  public alerts: Array<IAlert> = [];

  message = "";
  public globalResponse: any;
  formBuilder: any;
  authenticationService: any;
  route: any;
  alertService: any;
  f: any;


  constructor(private sharedService:SharedService, private modalService: NgbModal,private fb: FormBuilder,private regService:RegistrationService ,private authService:AuthenticationService,private router: Router) {

  }

  ngOnInit()
  {
   
    this.loginForm = this.fb.group({
      UserName:  ['', [Validators.required]],
      Password:['',[Validators.required]],
    });
  }
 
  
 

   Login()
  {
    let user=this.loginForm.value;
    this.isLoggedIn=false;
    this.authService.removeToken();
    this.alerts=[];
    //console.log(user);
        this.authService.ValidateUser(user)
            .subscribe((result) => {
              this.globalResponse = result; 
             
              
                           
            },
            error => { //This is error part
              console.log(error.message);
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Either user name or password is incorrect.'
              });
            },
            () => {
                //  This is Success part
               // console.log(this.globalResponse);
                this.authService.storeToken(this.globalResponse.access_token);  
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Login successful. Now you can close and proceed further.',
                });
                this.isLoggedIn=true;
                this.GetClaims();
                this.router.navigate(["/home"]); 
                
                
                }
              )
            }

            GetClaims()
            {
                  this.authService.getClaims()
                      .subscribe((result) => {
                        this.globalResponse = result;              
                      },
                      error => { //This is error part
                        console.log(error.message);
                      },
                      () => {
                          //  This is Success part
                         // console.log(this.globalResponse );
                          let a=this.globalResponse;
                          this.currentUser=this.globalResponse;
                          this.authService.storeRole(this.currentUser);
                          }
                        )
                      
            }
            LogOut()
            {
              this.isLoggedIn=false;
              this.authService.removeToken();
              this.router.navigate(["/"]); 
            }
           
          
         

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}


 

