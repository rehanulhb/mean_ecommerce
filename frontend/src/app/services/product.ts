import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environmentProd } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Product {
  http = inject(HttpClient);

  getAllProducts() {
    return this.http.get(environmentProd.apiUrl + '/product');
  }
}
