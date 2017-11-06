import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../shared/product';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NumberValidators } from '../shared/number-valiators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  errorMessage: string;
  pageTitle = "Edit Product";

  productForm: FormGroup;
  product: IProduct;
  sub: any;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
     this.productForm = this.formBuilder.group({
        productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        productCode: ['', Validators.required],
        starRating: ['', NumberValidators.range(1,5)],
        description: ['']
     });

      // when only need to get the initial value
      // let id = +this.route.snapshot.params['id'];

      // expect paramter to change without leaving the page
      // use observable     
     this.sub = this.route.params.subscribe(
       params => {
         const id = +params['id'];
         this.getProduct(id);
       }
     )
  };

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  };

  errorHandler(error: any) {
    this.errorMessage = error;
    console.log(`"in errorHandler. error = ${error}`);
  }

  getProduct(id) {
    console.log("in getProduct");
    this.productService.getProduct(id)
      .subscribe(
        (product: IProduct) => this.onProductRetrieved(product),
        (error: any)=>this.errorHandler(error)
      )
  }

  onProductRetrieved(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }

    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = "Add Product";
    }else {
      this.pageTitle = `Edit Product ${product.productName}`;
    }
    console.log("in onProductRetrieved " + this.product.productName);

    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description
    });
  }

  saveProduct(): void {
    if (this.productForm.dirty && this.productForm.valid)
    {
      let p = Object.assign({}, this.product, this.productForm.value);

      this.productService.saveProduct(p)
          .subscribe(
            ()=>this.completed(),
            error=>this.errorMessage = <any>error
          );
    } else {
      this.completed();
    }
  }

  completed(): void {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id)
        .subscribe(
          ()=>this.completed(),
          error=>this.errorMessage=<any>error
        );
  }
}
