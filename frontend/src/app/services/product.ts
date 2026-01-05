import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environmentProd } from '../../environments/environment.development';
import { TProduct } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class Product {
  http = inject(HttpClient);

  getAllProducts() {
    return this.http.get<TProduct[]>(environmentProd.apiUrl + '/product');
  }
  getProductById(id: string) {
    return this.http.get<TProduct>(environmentProd.apiUrl + '/product' + id);
  }

  addProduct(model: TProduct) {
    return this.http.post(environmentProd.apiUrl + '/product', model);
  }
  updateProduct(id: string, model: TProduct) {
    return this.http.put(environmentProd.apiUrl + '/product/' + id, model);
  }
  deleteProduct(id: string) {
    return this.http.delete(environmentProd.apiUrl + '/product/' + id);
  }
}
