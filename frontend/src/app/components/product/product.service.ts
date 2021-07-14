import { Product } from './product.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001/products"
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: [!isError ? 'msg-success' : 'msg-error']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
      .pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  read(page: number = 0, limit: number = 10): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}?_page=${page}&limit=${limit}`
    return this.http.get<HttpResponse<any>>(url, { observe: 'response' })
    .pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
    .pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
    .pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  deleteById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url)
    .pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('An error occurred during an HTTP request', true);
    return EMPTY
  }
}
