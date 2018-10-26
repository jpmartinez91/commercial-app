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
        console.log(products);
        this.products = products;
      },
        err => {
          console.error(err);
          const vacio: Product = { "id_product": "--", "description_product": "--", "line_product": "--", "name_product": "--", "price_product": 0, "state_product": "--", "units_product": 0 }
          this.products = []
          this.products.push(vacio);
        });
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteProduct(product.id_product).subscribe(
      ok => {
        console.log(ok)
      },
      err => {
        console.error(err);
      });
  }

  edit(product) {
    this.editProduct = product;
  }

  update() {
    if (this.editProduct) {
      this.productService.updatePRoduct(this.editProduct)
        .subscribe(product => {
          console.log(product);

          const ix = product ? this.products.findIndex(h => h.id_product === product.id_product) : -1;
          if (ix > -1) { this.products[ix] = product; }
        },
          err => {
            console.error(err);

          });
      this.editProduct = undefined;
    }
  }
}
