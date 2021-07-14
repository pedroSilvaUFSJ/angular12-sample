import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../product.model';
import { HttpResponse } from '@angular/common/http';

/**
 * Data source for the ProductRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Injectable()
export class ProductReadDataSource extends DataSource<Product> {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  totalProducts: number | undefined;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  public loading$ = this.loadingSubject.asObservable();

  constructor(private service: ProductService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.productsSubject.complete();
    this.loadingSubject.complete();
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]): Product[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'price': return compare(a.price, b.price, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(a.id, b.id, isAsc);
        default: return 0;
      }
    });
  }

  loadProducts(pageIndex: number = 0, pageSize: number = 10) {
    this.loadingSubject.next(true);
    this.service
      .read(pageIndex, pageSize)
      .subscribe((data: HttpResponse<any>) => {
        const total = data.headers.get('X-Total-Count');
        this.totalProducts = parseInt(total || '0');
        this.productsSubject.next(data.body);
        this.loadingSubject.next(false)
      })
  }

  getTotalProducts() {
    return this.totalProducts;
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | undefined, b: string | number | undefined, isAsc: boolean): number {
  return (a && b && a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
