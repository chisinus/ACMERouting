import { Component, OnInit, Input } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { IProduct } from '../shared/product';
import { FormGroup } from '@angular/forms';

@Component({
  templateUrl: './product-edit-info.component.html',
  styleUrls: ['./product-edit-info.component.css']
})
export class ProductEditInfoComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.product = data['product'];
      if (this.productForm) {
        this.productForm.reset();
      }
    })
  }
}
