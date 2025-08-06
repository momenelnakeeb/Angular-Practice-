import { Component } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Icategory } from '../../models/icategory';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: Iproduct[];
  categories: Icategory[];
  selectedCategoryID: number = 0;
  totalPriceNumber: number = 0;
  constructor() {
    this.products = [
      {
        id: 100,
        name: 'laptop 1',
        price: 100,
        quantitiy: 50,
        categoryID: 1,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 200,
        name: 'laptop 2',
        price: 600,
        quantitiy: 100,
        categoryID: 1,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 300,
        name: 'mobile 1',
        price: 900,
        quantitiy: 150,
        categoryID: 2,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 300,
        name: 'mobile 2',
        price: 900,
        quantitiy: 150,
        categoryID: 2,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 300,
        name: 'tablet 1',
        price: 900,
        quantitiy: 150,
        categoryID: 3,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 300,
        name: 'tablet 2',
        price: 900,
        quantitiy: 150,
        categoryID: 3,
        imageURL: 'https://placehold.co/600x400',
      },
    ];
    this.categories = [
      { id: 1, name: 'laptop' },
      { id: 2, name: 'mobile' },
      { id: 3, name: 'tablet' },
    ];
  }

  // the count needs to be string not number here
  Buy(count: string, price: number) {
    // this.totalPriceNumber+= +count*price;
    this.totalPriceNumber += Number(count) * price;
    // this.totalPriceNumber+= parseInt(count)*price;
  }
}
