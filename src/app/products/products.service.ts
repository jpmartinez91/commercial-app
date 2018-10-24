import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "./product";

@Injectable()
export class ProductService {
  private baseURL = "https://24p21dgvy0.execute-api.us-east-1.amazonaws.com/dev";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/list`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      responseType: "json"
    });
  }

  addProduct(product: Product): Observable<Product> {
    alert("----");
    console.log(product);
    return this.http.post<Product>(`${this.baseURL}/create`, product, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      responseType: "json"
    });
  }

  deleteProduct(id: String): Observable<{}> {
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }

  updatePRoduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseURL}/update/${product.id_product}`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'json'
    });
  }
}
