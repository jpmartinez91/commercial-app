import { Component, OnInit } from '@angular/core';
import { ProductService } from "./products.service";
import { Product } from "./product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [ProductService],
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products: Product[];
  editProduct: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        if (products.length === 0) {
          const vacio: Product = { "id_product": "s/n--", "description_product": "-s/n-", "line_product": "-s/n-", "name_product": "-s/n-", "price_product": 0, "state_product": "s/n--", "units_product": 0 }
          this.products = []
          this.products.push(vacio);
        } else {
          this.products = products;
        }
      },
        err => {
          console.error(err);
          const vacio: Product = { "id_product": "-error-", "description_product": "-error-", "line_product": "-error-", "name_product": "-error-", "price_product": 0, "state_product": "-error-", "units_product": 0 }
          this.products = []
          this.products.push(vacio);
        });
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteProduct(product.id_product).subscribe();
  }

  edit(product) {
    this.editProduct = product;
  }

  update() {
    if (this.editProduct) {
      this.productService.updatePRoduct(this.editProduct)
        .subscribe(
          product => {
            const ix = product ? this.products.findIndex(h => h.id_product === product.id_product) : -1;
            if (ix > -1) { this.products[ix] = product; }
          },
          err => {
            console.log(err);
          }
        );
      this.editProduct = undefined;
    }
  }
}
