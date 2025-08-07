import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Icategory } from '../../models/icategory';
import { HighlightCard } from '../../directives/highlight-card';
import { SquarePipe } from '../../pipes/square-pipe';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, HighlightCard, SquarePipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnChanges {
  products: Iproduct[];
  filteredProducts: Iproduct[];
  totalPriceNumber: number = 0;

  // the product component is a publisher so we will make an event now for @output
  // 1- eventemitter is generic so we need to pass the totatl number for each time it changes as a type number
  // then we need to make the event fires when the total price changes
  // and we also needs to get this out so use @output
  @Output() onTotalPriceChanges: EventEmitter<number>;

  @Input() recieveCategoryID: number = 0;

  num: number = 3;
  constructor() {
    this.products = [
      {
        id: 100,
        name: 'laptop 1',
        price: 100,
        quantity: 0,
        categoryID: 1,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 200,
        name: 'laptop 2',
        price: 600,
        quantity: 1,
        categoryID: 1,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 300,
        name: 'mobile 1',
        price: 900,
        quantity: 150,
        categoryID: 2,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 300,
        name: 'mobile 2',
        price: 900,
        quantity: 150,
        categoryID: 2,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 300,
        name: 'tablet 1',
        price: 900,
        quantity: 150,
        categoryID: 3,
        imageURL: 'https://placehold.co/600x400',
      },
      {
        id: 300,
        name: 'tablet 2',
        price: 900,
        quantity: 150,
        categoryID: 3,
        imageURL: 'https://placehold.co/600x400',
      },
    ];

    this.filteredProducts = this.products;
    // initial value
    this.onTotalPriceChanges = new EventEmitter<number>();
  }
  ngOnChanges() {
    this.filterProducts();
  }

  // the count needs to be string not number here
  Buy(count: string, price: number) {
    // this.totalPriceNumber+= +count*price;
    this.totalPriceNumber += Number(count) * price;
    // this.totalPriceNumber+= parseInt(count)*price;

    // the event
    // 2- firing the event
    this.onTotalPriceChanges.emit(this.totalPriceNumber);
  }

  // when the method called, it passed for it index of the elemnt and the elemnt itself
  trackItem(index: number, item: Iproduct) {
    // it must this method needs to return a unique number
    return item.id;
  }
  //

  filterProducts() {
    if (this.recieveCategoryID == 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (prod) => prod.categoryID == this.recieveCategoryID
      );
    }
  }
}
