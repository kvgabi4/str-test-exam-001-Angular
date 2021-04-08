import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'https://nettuts.hu/jms/kvgabi4/products';
  // apiUrl: string = 'http://localhost:3000/products';

  constructor(
    private http: HttpClient,
  ) { }

  // getAll(): void {
  //   this.http.get<Product[]>(this.apiUrl).subscribe(
  //     list => this.list$.next(list),
  //     // err => console.error(err)
  //     )
  //   }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
    }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product)
    }

  // create(product: Product): void {
  //   this.http.post<Product>(this.apiUrl, product).subscribe(
  //     () => this.getAll())
  //   }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${product.id}`, product)
    }

  remove(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${product.id}`)
    }

}
