import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Home',
      icon: 'storefront',
      routeUrl: ''
    }
  }

}
