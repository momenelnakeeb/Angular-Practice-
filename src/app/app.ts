import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Products } from './components/products/products';
import { Order } from './components/order/order';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Order],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ecommerceApp');
}
