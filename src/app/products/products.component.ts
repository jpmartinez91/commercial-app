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
        this.products = products
      },
        err => {
          const vacio: Product = { "_id": "--", "description_product": "--", "line_product": "--", "name_product": "--", "price_product": 0, "state_product": "--", "units_product": 0 }
          this.products.push(vacio);
        });
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteHero(product._id).subscribe();
  }

  edit(product) {
    this.editProduct = product;
  }

  update() {
    if (this.editProduct) {
      this.productService.updateHero(this.editProduct)
        .subscribe(product => {
          // replace the hero in the heroes list with update from server
          const ix = product ? this.products.findIndex(h => h._id === product._id) : -1;
          if (ix > -1) { this.products[ix] = product; }
        });
      this.editProduct = undefined;
    }
  }
}
