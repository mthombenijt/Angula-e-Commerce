import { NgModule } from '@angular/core';
import { Product } from './Product.Model';


export interface UpdateModule { 
    Category:string;
    Products:Product[];
}
