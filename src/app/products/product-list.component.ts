import { Component, OnInit } from '@angular/core';

import { ProductService } from '../shared/product.service';
import { IUser } from '../users/user';
import { IProduct } from '../shared/product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: 'Product List';
  listFilter: string;
  errorMessage: string;

  products: IProduct[];
  filteredProducts: IProduct[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
        .subscribe(products=>{this.products = products,
                              this.filteredProducts = products},
                    error=> this.errorMessage = <any>error);
  }
}
