import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TBrand } from '../../../types/brand';
import { TCategory } from '../../../types/category';
import { Category } from '../../../services/category';
import { Brand } from '../../../services/brand';
import { Product } from '../../../services/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  formbuilder = inject(FormBuilder);
  productForm = this.formbuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formbuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
  });

  categoryService = inject(Category);
  brandService = inject(Brand);
  productService = inject(Product);

  brands: TBrand[] = [];
  categories: TCategory[] = [];

  ngOnInit() {
    this.addImage();
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });
  }
  router = inject(Router);
  addProduct() {
    let value = this.productForm.value;
    console.log(value);
    this.productService.addProduct(value as any).subscribe((result) => {
      alert('Product Added');
      this.router.navigateByUrl('/admin/products');
    });
  }
  addImage() {
    this.images.push(this.formbuilder.control(null));
  }
  removeImage() {
    this.images.removeAt(this.images.controls.length - 1);
  }
  get images() {
    return this.productForm.get('images') as FormArray;
  }
}
