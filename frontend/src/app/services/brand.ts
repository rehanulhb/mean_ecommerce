import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TBrand } from '../types/brand';
import { environmentProd } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Brand {
  http = inject(HttpClient);

  getBrands() {
    return this.http.get<TBrand[]>(environmentProd.apiUrl + '/brand');
  }
  getBrandById(id: string) {
    return this.http.get<TBrand>(environmentProd.apiUrl + '/brand/' + id);
  }
  addBrand(name: string) {
    return this.http.post(environmentProd.apiUrl + '/brand', {
      name: name,
    });
  }
  updateBrand(id: string, name: string) {
    return this.http.put(environmentProd.apiUrl + '/brand/' + id, {
      name: name,
    });
  }
  deleteBrandById(id: string) {
    return this.http.delete(environmentProd.apiUrl + '/brand/' + id);
  }
}
