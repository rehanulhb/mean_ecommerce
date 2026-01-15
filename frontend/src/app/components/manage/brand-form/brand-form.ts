import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Brand } from '../../../services/brand';
import { ActivatedRoute, Router } from '@angular/router';

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
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  id!: string;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.brandsService.getBrandById(this.id).subscribe((result) => {
        this.name = result.name;
        this.cdr.detectChanges();
      });
    }
  }

  add() {
    this.brandsService.addBrand(this.name).subscribe((result) => {
      alert('Brand Added');
      this.router.navigateByUrl('/admin/brands');
    });
  }
  update() {
    this.brandsService.updateBrand(this.id, this.name).subscribe((result) => {
      alert('Brand Updated');
      this.router.navigateByUrl('/admin/brands');
    });
  }
}
