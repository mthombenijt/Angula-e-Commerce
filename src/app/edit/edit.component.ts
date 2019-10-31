import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../Models/Product.Model';
import { IAlert } from '../Models/IAlert';
import { AuthenticationService } from '../Services/authentication.service';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  productForm: FormGroup;
  sellerName:string="";
  sellerId:number=0;
  productFormInputs: Product[];
  @Input()
  public alerts: Array<IAlert> = [];
  public globalResponse: any;
  productImage:File=null;

  constructor(private fb: FormBuilder,private authService:AuthenticationService,private productService:ProductService,private router: Router) { }

  ngOnInit() {
    let productId = localStorage.getItem('editproductId');
    if (+productId > 0) {  
      this.productService.getUserById(+productId).subscribe(data => {  
        this.productForm.patchValue(data);  
      })  
    }

  this.productForm = this.fb.group({
    Id: [],
    Name:  ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
    Description:['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
    Price:['',Validators.compose([Validators.required])],
    Category:['',Validators.required],
    Quantity:['',Validators.required],
    //Address:['',Validators.required],
    image:['',Validators.required],
    Conditions:['',''],

  });
  this.GetSellerDetails();
  

}

GetSellerDetails()
{
  let details=this.authService.getRole();
 // console.log(details);
  this.sellerId=details["Id"];
  this.sellerName=details["UserName"];
}
handleImageFile(file:FileList)
{
  this.productImage=file.item(0);
}

onSubmit() {
  let productFormInputs=this.productForm.value;
    productFormInputs.SellerId=this.sellerId;
    productFormInputs.SellerName=this.sellerName;
    productFormInputs.ImageFile=this.productImage;

  this.productService.updateProduct(productFormInputs).subscribe(
      (result) => {
        this.router.navigate(['update']);
      },
      error => { //This is error part
        console.log(error.message);
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'Something went wrong while updating the product, Please try after sometime.'
        });
      },
      () => {
          //  This is Success part
          console.log(this.globalResponse);
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Product has been updated successfully.',
          });
          
          }
    )
}
  

public closeAlert(alert: IAlert) {
const index: number = this.alerts.indexOf(alert);
this.alerts.splice(index, 1);
}  


}
