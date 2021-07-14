import { HeaderService } from './../../components/template/header/header.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Product Register',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  navigateToProductCreate(): void {
    this.router.navigate(['products/create']);
  }
}
