import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const productId = +(this.route.snapshot.paramMap.get('id') ?? 0)
    this.productService
      .readById(productId)
      .subscribe(data => this.product = data)
  }

  deleteProduct(): void {
    if (this.product) {
      const productId = + (this.product?.id ?? 0);
      this.productService.deleteById(productId).subscribe(response => {
        this.productService.showMessage('Product Deleted!');
        this.router.navigate(['/products']);
      });
    }
  }

  cancelProduct(): void {
    this.router.navigate(['/products']);
  }
}
