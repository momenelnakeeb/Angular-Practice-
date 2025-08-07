import { Component } from '@angular/core';
import { Icategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Products } from '../products/products';

@Component({
  selector: 'app-order',
  imports: [FormsModule, CommonModule, Products],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  categories: Icategory[];
  selectedCategoryID: number = 0;
  recivedTotalPrice: number = 0;

  constructor() {
    this.categories = [
      { id: 1, name: 'laptop' },
      { id: 2, name: 'mobile' },
      { id: 3, name: 'tablet' },
    ];
  }

  // 4-
  calculateTotalPrice(top: number) {
    this.recivedTotalPrice = top;
  }
}
