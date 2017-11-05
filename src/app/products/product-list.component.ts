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
  products: IUser[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

}
