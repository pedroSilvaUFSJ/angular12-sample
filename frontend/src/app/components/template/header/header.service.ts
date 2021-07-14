import { HeaderData } from './header-data.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Initial',
    icon: 'home',
    routeUrl: ''
  });

  get headerData(): HeaderData {
    return this._headerData.value;
  }

  set headerData(data: HeaderData) {
    this._headerData.next(data);
  }
}
