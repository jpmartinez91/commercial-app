import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "./product";

@Injectable()
export class ProductService {
  private baseURL = "https://us-central1-tesis-gcl.cloudfunctions.net/commercial";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}-list`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseURL}-create`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      responseType: 'json'
    })
  }

  deleteProduct(id: String): Observable<{}> {
    return this.http.delete(`${this.baseURL}-delete?id=${id}`);
  }

  updatePRoduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseURL}-update?id=${product.id_product}`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      responseType: 'json'
    });
  }
}