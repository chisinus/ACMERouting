import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductService } from '../shared/product.service';
import { ProductResolver } from '../shared/product-resolver.service';
import { CategoryResolver } from '../shared/category-resolver.service';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'product/:id/edit',
             component: ProductEditComponent,
             resolve: { product: ProductResolver, categories: CategoryResolver },
             children: [
               {path: '', redirectTo: 'info', pathMatch: 'full'},
               {path: 'info', component: ProductEditInfoComponent},
               {path: 'tags', component: ProductEditTagsComponent}
             ]
      }
    ])
  ],
  providers: [ProductService, ProductResolver, CategoryResolver],
  declarations: [ProductListComponent, ProductEditComponent, ProductEditInfoComponent, ProductEditTagsComponent]
})
export class ProductsModule { }
