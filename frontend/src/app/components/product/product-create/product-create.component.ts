import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  product: Product = {
    name: '',
    price: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  createProduct(): void {
    this.productService.create(this.product).subscribe(response => {
      this.productService.showMessage('Product Created! ' + response.id);
      this.router.navigate(['/products']);
    });
  }

  cancelProduct(): void {
    this.router.navigate(['/products']);
  }
}