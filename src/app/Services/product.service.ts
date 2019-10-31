import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';  
import { Observable, of, throwError, pipe, BehaviorSubject, Subject} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Product } from '../Models/Product.Model';
import { OrderItem } from '../Models/OrderItem.Model';
import { p } from '@angular/core/src/render3';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  orderItem:OrderItem[];
  productAddedTocart:Product[];


  public apiURL:string="http://localhost:50148/api/Products";
  selectedItems: any;
  constructor(private httpClient:HttpClient, private authService:AuthenticationService,) { 

  
  }

  
 
  saveProductInfo (product:any)
  {
    var reqHeader = new HttpHeaders({ 'Authorization':'Bearer '+this.authService.getToken()});
        reqHeader.append('Content-Type', 'application/json');
        const formData: FormData = new FormData();
         formData.append('UnitPrice', product['Price']);
         formData.append('Name', product.Name.toString());
         formData.append('SellerId', product.SellerId.toString());
         formData.append('SellerName', product.SellerName.toString());
         formData.append('Category', product.Category.toString());
         formData.append('TC', product['Conditions']);
         formData.append('Quantity', product.Quantity.toString());
         formData.append('Description', product.Description.toString());
         formData.append('Image', product['ImageFile']);
         
        
    return this.httpClient.post(this.apiURL,formData,{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  getAllProducts ()
  {
    return this.httpClient.get(this.apiURL)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  addProductToCart(prodcuts: any) {
    localStorage.setItem("product", JSON.stringify(prodcuts));
  }
  getProductFromCart() {
    //return localStorage.getItem("product");
    return JSON.parse(localStorage.getItem('product'));
  }
  removeAllProductFromCart() {
    return localStorage.removeItem("product");
  }
  deleteProduct(id: number) {
    return this.httpClient.delete(this.apiURL + '/' + id);
  }
  updateProduct(product: Product) {
    return this.httpClient.put(this.apiURL + '/' + product.Id, product);
  }
  getUserById(id: number) {
    return this.httpClient.get<Product>(this.apiURL + '/' + id);
  }

removeProduct(product: Product) {
	const products: Product[] = JSON.parse(localStorage.getItem('product'));

		for (let i = 0; i < products.length; i++) {
			if (products[i].Id === product.Id) {
				products.splice(i, 1);
				break;
			} 
}

localStorage.setItem('product', JSON.stringify(products));

	
}

getLocalCartProducts(): Product[] {
  const products: Product[] = JSON.parse(localStorage.getItem('product')) || [];

  return products;
}

  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}
