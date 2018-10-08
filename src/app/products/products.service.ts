import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from "./product";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }),
    responseType: 'json'
};

@Injectable()
export class ProductService {

    private baseURL = "http://localhost:7071/api";

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseURL}/getProducts`);
    }

    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.baseURL}/index`, product, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            responseType: 'json'
        })
    }

    deleteHero(id: String): Observable<{}> {
        // const url = `${this.baseURL}/${id}`;
        // return this.http.delete(url);
        return this.http.delete(`${this.baseURL}/delete`);
    }

    updateHero(product: Product): Observable<Product> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'my-new-auth-token');
        return this.http.put<Product>(this.baseURL, product, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            responseType: 'json'
        });
    }
}