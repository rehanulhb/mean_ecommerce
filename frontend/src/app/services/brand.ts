import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TBrand } from '../types/brand';
import { environmentDev } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Brand {
  http = inject(HttpClient);

  getBrands() {
    return this.http.get<TBrand[]>(environmentDev.apiUrl + '/brand');
  }
  getBrandById(id: string) {
    return this.http.get<TBrand>(environmentDev.apiUrl + '/brand/' + id);
  }
  addBrand(name: string) {
    return this.http.post(environmentDev.apiUrl + '/brand', {
      name: name,
    });
  }
  updateBrand(id: string, name: string) {
    return this.http.put(environmentDev.apiUrl + '/brand/' + id, {
      name: name,
    });
  }
  deleteBrandById(id: string) {
    return this.http.delete(environmentDev.apiUrl + '/brand/' + id);
  }
}
