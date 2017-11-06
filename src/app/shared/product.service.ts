import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {IProduct} from './product';

@Injectable()
export class ProductService {
  private baseUrl = 'http://localhost:50000/api/product';

  constructor(private http: Http) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get(this.baseUrl)
            .map(p => p.json())
            .catch(this.errorHandler);
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return Observable.create((observer: any) => {
                                observer.next(this.initialProduct());
                                observer.complete();
      });
    }

    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
              .map(p => p.json())
              .do(p => console.log('getProduct: ' + JSON.stringify(p)))
              .catch(this.errorHandler);
  }

  deleteProduct(id: number): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url, options);
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    if (product.id === 0) {
      return this.createProduct(product, options);
    }

    return this.updateProduct(product, options);
  }

  createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
    product.id = undefined;
    return this.http.post(this.baseUrl, product, options)
              .map(p=>p.json())
              .do(data=>console.log('create product ' + JSON.stringify(data)))
              .catch(this.errorHandler);
  }

  updateProduct(product: IProduct, options: RequestOptions) {
    const url = `${this.baseUrl}/${product.id}`;

    return this.http.put(url, product, options)
              .map(p=>p.json())
              .do(data=>console.log('update product ' + JSON.stringify(data)))
              .catch(this.errorHandler);
}


  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('return an error. ' + error);
    console.log(error.message);

    return Observable.throw(error.message);
  }

  initialProduct(): IProduct {
    return {
      id: 0,
      productName: '',
      productCode: '',
      description: '',
      price: 0.0,
      starRating: 0
    };
  }
}
