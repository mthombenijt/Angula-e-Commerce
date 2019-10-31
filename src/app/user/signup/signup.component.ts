import { Component, OnInit, Input } from '@angular/core';
import { IAlert } from 'src/app/Models/IAlert';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Registration } from 'src/app/Models/User.Models';
import { SharedService } from 'src/app/Services/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from 'src/app/Services/Registration.Service';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  closeResult: string;
  registrationForm: FormGroup;
  registrationInputs: Registration[];
  currentUser: Registration[];
  isLoggedIn:boolean=false;

  cartItemCount:number=0;
  approvalText:string="";

  @Input()
  public alerts: Array<IAlert> = [];

  message = "";
  public globalResponse: any;
  router: any;

  constructor(private sharedService:SharedService, private modalService: NgbModal,private fb: FormBuilder,private regService:RegistrationService ,private authService:AuthenticationService) {

  }

  ngOnInit() {
    this.sharedService.currentMessage.subscribe(msg => this.cartItemCount = msg);
    this.registrationForm = this.fb.group({
      UserName:  ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Password:['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      Email:['',Validators.compose([Validators.required,Validators.email])],
      Role:['',Validators.required],
      Phone:['',Validators.required],
      Gender:['',''],
    });
  }

  OnRegister()
  {
    this.registrationInputs=this.registrationForm.value;

    console.log(this.registrationInputs);
        this.regService.RegisterUser(this.registrationInputs)
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Registration failed with fallowing error:'+error,
              });
            },
            () => {
                //  This is Success part
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Registration successful.',
                });
               
                
                }
              )
            }
     public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
    this.router.navigate(["/home"]);
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

  

}
