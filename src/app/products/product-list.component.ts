import { Component, OnInit } from '@angular/core';

import { ProductService } from '../shared/product.service';
import { IUser } from '../users/user';
import { IProduct } from '../shared/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage: string;

  products: IProduct[];
  filteredProducts: IProduct[];

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this._listFilter?this.performFilter(this._listFilter):this.products;
  }

  performFilter(filter: string): IProduct[] {
    if (!filter) {
      return this.products;
    }
    
    filter = filter.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filter) !== -1);
  }
  
  constructor(private productService: ProductService,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.productService.getProducts()
        .subscribe(products=>this.initProductList(products),
                   error=> this.errorMessage = <any>error);
  }

  initProductList(products: IProduct[]): void {
    this.products = products,
    this.filteredProducts = products

    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.performFilter(this.listFilter);
  }
}
