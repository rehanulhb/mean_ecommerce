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
import { ActivatedRoute, Router } from '@angular/router';

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
  id!: string;
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      this.productService.getProductById(this.id).subscribe((result) => {
        for (let index = 0; index < result.images.length; index++) {
          this.addImage();
        }
        this.productForm.patchValue(result as any);
      });
    } else {
      this.addImage();
    }
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
  updateProduct() {
    let value = this.productForm.value;
    console.log(value);
    this.productService.updateProduct(this.id, value as any).subscribe((result) => {
      alert('Product Updated');
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
