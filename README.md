# 🅰️ My Angular Learning Journey - E-commerce App

Welcome to my comprehensive Angular learning project! 🎉  
This e-commerce application demonstrates fundamental Angular concepts including component architecture, data binding, directives, pipes, and component communication. This README documents my complete learning journey with detailed explanations and code examples.

---

## 📁 Project Structure

```
src/app/
├── components/
│   ├── header/
│   ├── footer/
│   ├── products/
│   └── order/
├── models/
│   ├── iproduct.ts
│   └── icategory.ts
├── directives/
│   └── highlight-card.ts
├── pipes/
│   └── square-pipe.ts
└── app.component.ts
```

---

## 🏗️ Initial Setup & Project Structure

### Creating Models (Interfaces)

I started by generating TypeScript interfaces to define my data structures:

```bash
ng g i IProduct
ng g i ICategory
```

**IProduct Interface:**
```typescript
export interface Iproduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageURL: string;
    categoryID: number;
}
```

**ICategory Interface:**
```typescript
export interface Icategory {
    id: number;
    name: string;
}
```

### Creating Components

I organized all components under the `/components` folder:

```bash
ng g c Header
ng g c Footer
ng g c Products
ng g c Order
```

---

## 🎨 Bootstrap Integration

To enhance the UI, I installed Bootstrap:

```bash
npm i bootstrap
```

Then configured Bootstrap in `angular.json`:

```json
{
  "styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "src/styles.css"
  ],
  "scripts": [
    "node_modules/bootstrap/dist/js/bootstrap.bundle.js"
  ]
}
```

---

## ▶️ Running the Application

```bash
ng serve --open
```

---

## 🧩 Component Integration

In `app.component.html`, I replaced the default content with my custom components:

```html
<app-header></app-header>
<app-order></app-order>
<app-footer></app-footer>
```

**App Component TypeScript:**
```typescript
import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
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
```

---

## 🔄 Angular Data Binding - The 6 Types

### 1. **Interpolation (`{{}}`)**
Displays component data in the template:

```html
<h5 class="card-title">{{ product.name }}</h5>
<p>Price: {{ product.price | currency : "EUR" : "code" }}</p>
```

### 2. **Property Binding (`[property]`)**
Binds DOM properties to component values (dynamic values):

```html
<img [src]="product.imageURL" [alt]="product.name" />
<option [value]="category.id">{{ category.name }}</option>
```

### 3. **Event Binding (`(event)`)**
Handles events from view to controller:

```html
<button (click)="Buy(countInput.value, product.price)">Buy</button>
```

### 4. **Two-Way Binding (`[(ngModel)]`)**
Combines property and event binding for form inputs:

```html
<select [(ngModel)]="selectedCategoryID">
  <option value="0">All</option>
  <option *ngFor="let category of categories" [value]="category.id">
    {{ category.name }}
  </option>
</select>
```

> **Important:** Import `FormsModule` for `ngModel` to work!

### 5. **Class Binding (`[class.className]`)**
Conditionally applies CSS classes:

```html
<div class="col-md-4 mb-4" 
     *ngFor="let product of products" 
     [class.d-none]="product.categoryID != selectedCategoryID">
```

### 6. **Style Binding (`[style.property]`)**
Conditionally applies inline styles:

```html
<div [style.background-color]="product.quantity === 0 ? 'yellow' : 'white'">
```

---

## 📋 Angular Directives

### Built-in Directives

#### **1. Component Directives**
Every component has a selector that acts as a directive:

```typescript
@Component({
  selector: 'app-products', // This is a component directive
  // ...
})
```

#### **2. Structural Directives**
Change DOM layout by adding/removing elements:

**NgFor with Template Variables:**
```html
@for (product of filteredProducts; track product.id; let i = $index) {
  <div class="col-md-4 mb-4">
    <h5>{{ i + 1 }}. {{ product.name }}</h5>
    <!-- Product content -->
  </div>
}
```

**NgFor Variables Available:**
- `$implicit`: The current item
- `$index`: Current index
- `$count`: Total length
- `$first`: True if first item
- `$last`: True if last item
- `$even`: True if even index
- `$odd`: True if odd index

**TrackBy Function (Performance Optimization):**
```typescript
trackItem(index: number, item: Iproduct) {
  return item.id; // Return unique identifier
}
```

**NgIf with NgContainer (Multiple Directives):**
```html
<ng-container *ngFor="let product of products">
  <div *ngIf="product.quantity > 0">
    <!-- Product card -->
  </div>
</ng-container>
```

**Modern Control Flow (Angular 17+):**
```html
@for (product of products; track product.id) {
  <div>{{ product.name }}</div>
} @empty {
  <p>No products found</p>
}

@if (showProducts) {
  <app-products></app-products>
}

@switch (selectedCategory) {
  @case (1) { <p>Laptops</p> }
  @case (2) { <p>Mobiles</p> }
  @default { <p>All Categories</p> }
}
```

#### **3. Attribute Directives**
Change appearance or behavior without changing DOM structure:

- `ngModel`: Two-way data binding
- `ngClass`: Conditional classes
- `ngStyle`: Conditional styles

---

## 🎨 Custom Directives

I created a custom highlight directive for interactive cards:

**Generate Directive:**
```bash
ng g directive highlightCard
```

**HighlightCard Directive:**
```typescript
import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
})
export class HighlightCard implements OnChanges {
  @Input() externalcolor: string = 'black';
  @Input('appHighlightCard') defaultColor: string = 'gray';

  constructor(private element: ElementRef) {}

  ngOnChanges() {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseover') mouseOver() {
    this.element.nativeElement.style.backgroundColor = this.externalcolor;
  }

  @HostListener('mouseout') mouseOut() {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }
}
```

**Usage in Template:**
```html
<div class="card" appHighlightCard="gray" externalcolor="pink">
  <!-- Card content -->
</div>
```

---

## 🔧 Angular Pipes

Pipes transform displayed values without changing the original data.

### Built-in Pipes
```html
<!-- Currency pipe -->
Price: {{ product.price | currency : "EUR" : "code" }}

<!-- Date pipe -->
{{ today | date : 'shortDate' }}
```

### Custom Pipe

**Generate Pipe:**
```bash
ng g pipe square
```

**Square Pipe Implementation:**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'square',
})
export class SquarePipe implements PipeTransform {
  transform(value: number, pow: number): number {
    return Math.pow(value, pow);
  }
}
```

**Usage:**
```html
<h2>{{ num | square : 3 }}</h2>
```

---

## 🔄 Component Lifecycle & Communication

### Parent-Child Communication

#### **Parent to Child (@Input)**

**Child Component (Products):**
```typescript
export class Products implements OnChanges {
  @Input() recieveCategoryID: number = 0;
  
  ngOnChanges() {
    this.filterProducts(); // React to input changes
  }
  
  filterProducts() {
    if (this.recieveCategoryID == 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        prod => prod.categoryID == this.recieveCategoryID
      );
    }
  }
}
```

**Parent Template (Order):**
```html
<app-products [recieveCategoryID]="selectedCategoryID"></app-products>
```

#### **Child to Parent (@Output)**

**Child Component (Products):**
```typescript
export class Products {
  @Output() onTotalPriceChanges: EventEmitter<number> = new EventEmitter<number>();
  totalPriceNumber: number = 0;

  Buy(count: string, price: number) {
    this.totalPriceNumber += Number(count) * price;
    this.onTotalPriceChanges.emit(this.totalPriceNumber); // Emit event
  }
}
```

**Parent Component (Order):**
```typescript
export class Order {
  recivedTotalPrice: number = 0;

  calculateTotalPrice(totalPrice: number) {
    this.recivedTotalPrice = totalPrice;
  }
}
```

**Parent Template:**
```html
<app-products 
  [recieveCategoryID]="selectedCategoryID"
  (onTotalPriceChanges)="calculateTotalPrice($event)">
</app-products>
<h1>Total: {{ recivedTotalPrice }}</h1>
```

---

## 🔄 Component Lifecycle Hooks

### Key Lifecycle Methods

1. **ngOnChanges**: Called when input properties change
2. **ngOnInit**: Called after component initialization  
3. **ngOnDestroy**: Called before component destruction
4. **ngAfterViewInit**: Called after view initialization

**Example Implementation:**
```typescript
export class Products implements OnChanges, OnInit, OnDestroy {
  ngOnChanges(changes: SimpleChanges) {
    console.log('Input properties changed:', changes);
    this.filterProducts();
  }
  
  ngOnInit() {
    console.log('Component initialized');
  }
  
  ngOnDestroy() {
    console.log('Component destroyed');
  }
}
```

---

## 🏗️ Complete Component Examples

### Products Component

**TypeScript:**
```typescript
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightCard } from '../../directives/highlight-card';
import { SquarePipe } from '../../pipes/square-pipe';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, HighlightCard, SquarePipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnChanges {
  products: Iproduct[] = [
    {
      id: 100,
      name: 'laptop 1',
      price: 100,
      quantity: 0,
      categoryID: 1,
      imageURL: 'https://placehold.co/600x400',
    },
    // ... more products
  ];

  filteredProducts: Iproduct[] = [];
  totalPriceNumber: number = 0;

  @Input() recieveCategoryID: number = 0;
  @Output() onTotalPriceChanges: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.filteredProducts = this.products;
  }

  ngOnChanges() {
    this.filterProducts();
  }

  Buy(count: string, price: number) {
    this.totalPriceNumber += Number(count) * price;
    this.onTotalPriceChanges.emit(this.totalPriceNumber);
  }

  trackItem(index: number, item: Iproduct) {
    return item.id;
  }

  filterProducts() {
    if (this.recieveCategoryID == 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        prod => prod.categoryID == this.recieveCategoryID
      );
    }
  }
}
```

### Order Component

**TypeScript:**
```typescript
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
  categories: Icategory[] = [
    { id: 1, name: 'laptop' },
    { id: 2, name: 'mobile' },
    { id: 3, name: 'tablet' },
  ];
  
  selectedCategoryID: number = 0;
  recivedTotalPrice: number = 0;

  calculateTotalPrice(totalPrice: number) {
    this.recivedTotalPrice = totalPrice;
  }
}
```

---

## 📚 Key Concepts Learned

### ✅ Angular Fundamentals
- Project structure and organization
- Component creation and management
- Service and interface generation
- Module imports and declarations

### ✅ Data Binding Mastery
- Interpolation for displaying data
- Property binding for dynamic attributes
- Event binding for user interactions
- Two-way binding for form controls
- Class and style binding for conditional styling

### ✅ Directives Deep Dive
- Built-in structural directives (*ngFor, *ngIf, *ngSwitch)
- Modern control flow (@for, @if, @switch)
- Attribute directives (ngModel, ngClass, ngStyle)
- Custom directive creation with @HostListener
- Performance optimization with TrackBy

### ✅ Component Communication
- Parent-to-child communication with @Input
- Child-to-parent communication with @Output and EventEmitter
- Component lifecycle hooks (ngOnChanges, ngOnInit)
- Event handling and data flow

### ✅ Pipes and Transformations
- Built-in pipes (currency, date)
- Custom pipe creation
- Data transformation without mutating original data

### ✅ Modern Angular Features
- Standalone components
- Signal-based reactivity
- New control flow syntax
- Template reference variables

---

## 🚀 Running the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/momenelnakeeb/Angular-Practice-.git
   cd ecommerceApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   ng serve --open
   ```

4. **Build for production:**
   ```bash
   ng build --prod
   ```

---

## 🛠️ Technologies & Dependencies

- **Angular 17+** - Framework
- **TypeScript** - Programming language
- **Bootstrap 5** - CSS framework
- **RxJS** - Reactive programming
- **Angular CLI** - Development tools

---

## 📈 Advanced Features Implemented

### Performance Optimizations
- TrackBy functions for efficient *ngFor rendering
- OnPush change detection strategy ready
- Lazy loading preparation

### Code Quality
- TypeScript interfaces for type safety
- Component lifecycle implementation
- Separation of concerns (models, components, directives, pipes)
- Reactive programming with EventEmitter

### User Experience
- Interactive card highlighting
- Real-time filtering
- Dynamic total price calculation
- Responsive Bootstrap layout

---

## 🔮 Next Steps & Learning Path

### Immediate Improvements
- [ ] Implement Angular services for data management
- [ ] Add HTTP client for API integration
- [ ] Implement routing and navigation
- [ ] Add form validation

### Advanced Topics to Explore
- [ ] State management with NgRx
- [ ] Angular Material integration
- [ ] Unit testing with Jasmine/Karma
- [ ] End-to-end testing with Cypress
- [ ] PWA capabilities
- [ ] Angular Universal (SSR)

---

## 📬 Contact & Resources

- **GitHub Repository:** [Angular-Practice](https://github.com/momenelnakeeb/Angular-Practice-)
- **Angular Documentation:** [angular.io](https://angular.dev)
- **Bootstrap Documentation:** [getbootstrap.com](https://getbootstrap.com)

Feel free to explore the code, open issues, or contribute improvements! This project represents my journey from Angular basics to more advanced concepts, and I'm excited to continue learning and building with Angular.


*Happy coding! 🚀*