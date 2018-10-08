import { Component, OnInit } from '@angular/core';
import { ProductService } from "../products/products.service";
import { Product } from "../products/product";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [ProductService],
  styleUrls: ['./form.component.css'],
})

export class FormComponent implements OnInit {
  public _name;
  public _state;
  public _description;
  public _units;
  public _price;
  public _line;

  constructor(private service: ProductService) { }

  ngOnInit() {
  }

  createProduct(name_product, units_product, price_product, line_product, state_product, description_product) {

    if (!name_product || !units_product || !price_product || !line_product || !state_product || !description_product) {
      return;
    }

    const newProduct: Product = { name_product, units_product, price_product, line_product, state_product, description_product } as Product;

    this.service.addProduct(newProduct).subscribe(data => {
      console.log(data);
    }, err => {
      console.error(err.message);
    })
  }

}
