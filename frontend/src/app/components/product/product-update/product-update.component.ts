import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const productId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.productService
      .readById(productId)
      .subscribe(data => this.product = data)
  }

  updateProduct(): void {
    if (this.product) {
      this.productService.update(this.product).subscribe(response => {
        this.productService.showMessage('Product Updated! ' + response.id);
        this.router.navigate(['/products']);
      });
    }
  }

  cancelProduct(): void {
    this.router.navigate(['/products']);
  }
}
