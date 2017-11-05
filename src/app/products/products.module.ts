import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductService } from '../shared/product.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'product/:id/edit', component: ProductEditComponent}
    ])
  ],
  providers: [ProductService],
  declarations: [ProductListComponent, ProductEditComponent]
})
export class ProductsModule { }
