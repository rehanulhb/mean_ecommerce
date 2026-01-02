import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Brand } from '../../../services/brand';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.scss',
})
export class BrandForm {
  name!: string;
  brandsService = inject(Brand);
  router = inject(Router);

  add() {
    this.brandsService.addBrand(this.name).subscribe((result) => {
      alert('Brand Added');
      this.router.navigateByUrl('/admin/brands');
    });
  }
}
