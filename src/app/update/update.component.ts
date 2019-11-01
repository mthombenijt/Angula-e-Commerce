import { Component, OnInit, EventEmitter, Output, Inject, HostListener } from '@angular/core';
import { IAlert } from '../Models/IAlert';
import { ProductDisplay } from '../Models/ProductDisplay.Model';
import { Product } from '../Models/Product.Model';
import { ProductService } from '../Services/product.service';
import { SharedService } from '../Services/shared.service';
import { DOCUMENT } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
)]


})
export class UpdateComponent implements OnInit {
  [x: string]: any;

  public alerts: Array<IAlert> = [];
  cartItemCount: number = 0;
  @Output() cartEvent = new EventEmitter<number>();
  public globalResponse: any;
  yourByteArray:any;
  allProducts: ProductDisplay[];
  productAddedTocart:Product[];
  products: Product[];

  constructor(@Inject(DOCUMENT) _document,private productService:ProductService,private sharedService:SharedService,private router:Router,) { }

  ngOnInit() {
    this.productService.getAllProducts()
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              console.log(error.message);
            },
            () => {
                //  This is Success part
                console.log("Product fetched sucssesfully.");
                console.log(this.globalResponse);
                this.allProducts=this.globalResponse;
                }
              )

 }
 OnAddCart(product:Product)
            {
              console.log(product);
              
              this.productAddedTocart=this.productService.getProductFromCart();
              if(this.productAddedTocart==null)
              {
                this.productAddedTocart=[];
                this.productAddedTocart.push(product);
                this.productService.addProductToCart(this.productAddedTocart);
                this.alerts.push({
                  id: 1,
                  type: 'success',
                  message: 'Product added to cart.'
                });
                setTimeout(()=>{   
                  this.closeAlert(this.alerts);
             }, 3000);

              }
              else
              {
                let tempProduct=this.productAddedTocart.find(p=>p.Id==product.Id);
                if(tempProduct==null)
                {
                  this.productAddedTocart.push(product);
                  this.productService.addProductToCart(this.productAddedTocart);
                  this.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Product added to cart.'
                  });
                  //setTimeout(function(){ }, 2000);
                  setTimeout(()=>{   
                    this.closeAlert(this.alerts);
               }, 3000);
                }
                else
                {
                  this.alerts.push({
                    id: 2,
                    type: 'warning',
                    message: 'Product already exist in cart.'
                  });
                  setTimeout(()=>{   
                    this.closeAlert(this.alerts);
               }, 3000);
                }
                
              }
              //console.log(this.cartItemCount);
              this.cartItemCount=this.productAddedTocart.length;
              this.cartEvent.emit(this.cartItemCount);
              this.sharedService.updateCartCount(this.cartItemCount);
            }
            public closeAlert(alert:any) {
              const index: number = this.alerts.indexOf(alert);
              this.alerts.splice(index, 1);
          }
          deleteProduct(product: Product): void {
            if (confirm('Are you sure to delete this record ?') == true) {
            this.productService.deleteProduct(product.Id)
              .subscribe( data => {
                this.productService.getAllProducts();
                this.toastr.warning("Deleted Successfully","Employee Register");
                
                })
              }
              
          };

          editProduct(product: Product): void {
            localStorage.removeItem('editproductId');
            localStorage.setItem('editproductId', product.Id.toString());
            this.router.navigate(['edit']);
          };
        
          @HostListener('window:scroll', ['$event'])
          onWindowScroll(_e: any) {
             if (window.pageYOffset > 50) {
               let element = document.getElementById('navbar');
               element.classList.add('sticky');
             } else {
              let element = document.getElementById('navbar');
                element.classList.remove('sticky'); 
             }
          }
          
     

}
