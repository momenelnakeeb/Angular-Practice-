# 🅰️ My Angular Learning Journey - E-commerce App

Welcome to my comprehensive Angular learning project! 🎉  
This e-commerce application demonstrates fundamental Angular concepts including component architecture, data binding, directives, pipes, and component communication. This README documents my complete learning journey with detailed explanations and code examples.

---

## 📁 Project Structure

```
.editorconfig
.gitignore
.vscode
   |-- extensions.json
   |-- launch.json
   |-- tasks.json
README.md
angular.json
image.png
package-lock.json
package.json
public
   |-- favicon.ico
src
   |-- app
   |   |-- app.config.ts
   |   |-- app.css
   |   |-- app.html
   |   |-- app.routes.ts
   |   |-- app.spec.ts
   |   |-- app.ts
   |   |-- components
   |   |   |-- footer
   |   |   |   |-- footer.css
   |   |   |   |-- footer.html
   |   |   |   |-- footer.spec.ts
   |   |   |   |-- footer.ts
   |   |   |-- header
   |   |   |   |-- header.css
   |   |   |   |-- header.html
   |   |   |   |-- header.spec.ts
   |   |   |   |-- header.ts
   |   |   |-- order
   |   |   |   |-- order.css
   |   |   |   |-- order.html
   |   |   |   |-- order.spec.ts
   |   |   |   |-- order.ts
   |   |   |-- products
   |   |   |   |-- products.css
   |   |   |   |-- products.html
   |   |   |   |-- products.spec.ts
   |   |   |   |-- products.ts
   |   |-- directives
   |   |   |-- highlight-card.spec.ts
   |   |   |-- highlight-card.ts
   |   |-- models
   |   |   |-- icategory.ts
   |   |   |-- iproduct.ts
   |   |-- pipes
   |   |   |-- square-pipe.spec.ts
   |   |   |-- square-pipe.ts
   |-- index.html
   |-- main.ts
   |-- styles.css
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```

---

**Example Implementation:**

```typescript
export class Products implements OnChanges, OnInit, OnDestroy {
  ngOnChanges(changes: SimpleChanges) {
    // Called whenever @Input properties change# 🅰️ My Angular Learning Journey - E-commerce App

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
    id: number;        // Unique identifier for each product
    name: string;      // Product name (e.g., "Laptop 1")
    price: number;     // Product price in currency units
    quantity: number;  // Available stock quantity
    imageURL: string;  // URL path to product image
    categoryID: number; // Foreign key linking to category
}
```

**Explanation:** This interface defines the structure of a product object. TypeScript interfaces provide type safety - if we try to create a product without all these properties or with wrong types, TypeScript will show an error. The `categoryID` creates a relationship between products and categories.

**ICategory Interface:**

```typescript
export interface Icategory {
    id: number;    // Unique identifier for the category
    name: string;  // Category display name (e.g., "Laptops")
}
```

**Explanation:** This interface defines our category structure. It's simpler than the product interface but follows the same pattern. The `id` will be used to filter products by category.

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
  selector: 'app-root',           // HTML tag name for this component
  imports: [Header, Footer, Order], // Standalone components we want to use
  templateUrl: './app.html',      // Path to HTML template
  styleUrl: './app.css',          // Path to component-specific CSS
})
export class App {
  // Signal-based reactive property (Angular 17+ feature)
  protected readonly title = signal('ecommerceApp');
}
```

**Explanation:** This is the root component of our app. The `@Component` decorator tells Angular this is a component. `imports` array contains standalone components we can use in the template. `signal()` creates a reactive value that Angular can track for changes - it's the modern alternative to regular properties.

---

## 🔄 Angular Data Binding - The 6 Types

### 1. **Interpolation (`{{}}`)**

Displays component data in the template:

```html
<h5 class="card-title">{{ product.name }}</h5>
<p>Price: {{ product.price | currency : "EUR" : "code" }}</p>
```

**Explanation:** Double curly braces `{{}}` tell Angular to evaluate the expression inside and display the result. `product.name` takes the name property from the product object. The pipe `| currency : "EUR" : "code"` transforms the price number into Euro currency format with currency code (like "EUR 100.00").

### 2. **Property Binding (`[property]`)**

Binds DOM properties to component values (dynamic values):

```html
<img [src]="product.imageURL" [alt]="product.name" />
<option [value]="category.id">{{ category.name }}</option>
```

**Explanation:** Square brackets `[]` around an attribute name mean "bind this attribute to the result of this expression." Unlike regular HTML attributes that are static, property binding makes them dynamic. `[src]="product.imageURL"` means the image source will change if `product.imageURL` changes. This is one-way binding from component to template.

### 3. **Event Binding (`(event)`)**

Handles events from view to controller:

```html
<button (click)="Buy(countInput.value, product.price)">Buy</button>
```

**Explanation:** Parentheses `()` around an event name mean "when this event happens, execute this method." When the button is clicked, it calls the `Buy` method in the component, passing two parameters: the value from an input field (`countInput.value`) and the product's price. This is one-way binding from template to component.

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

**Explanation:** The "banana in a box" syntax `[()]` combines property and event binding. `[(ngModel)]="selectedCategoryID"` means:

1. The select's value is bound to `selectedCategoryID` (property binding)
2. When user changes selection, `selectedCategoryID` is updated (event binding)
This creates a two-way connection between the form control and the component property.

> **Important:** Import `FormsModule` for `ngModel` to work!

### 5. **Class Binding (`[class.className]`)**

Conditionally applies CSS classes:

```html
<div class="col-md-4 mb-4" 
     *ngFor="let product of products" 
     [class.d-none]="product.categoryID != selectedCategoryID">
```

**Explanation:** `[class.d-none]` adds the CSS class `d-none` (Bootstrap's hide class) only when the condition is true. If `product.categoryID != selectedCategoryID` evaluates to true, the element gets the `d-none` class and becomes hidden. This allows us to show/hide products based on selected category without removing them from the DOM.

### 6. **Style Binding (`[style.property]`)**

Conditionally applies inline styles:

```html
<div [style.background-color]="product.quantity === 0 ? 'yellow' : 'white'">
```

**Explanation:** `[style.background-color]` applies inline CSS styles dynamically. The ternary operator `? :` works like an if-else statement: if `product.quantity === 0` is true, set background to yellow, otherwise set it to white. This provides visual feedback when products are out of stock.

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

**Explanation:** When we use `<app-products></app-products>` in a template, we're using a component directive. The `selector` property defines the HTML tag name that Angular will recognize and replace with the component's template. Component directives are the most common type - every component creates one.

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

**Explanation:** This is Angular 17's new control flow syntax. `@for` replaces `*ngFor`.

- `product of filteredProducts` iterates through each product
- `track product.id` tells Angular to track each item by its unique ID (performance optimization)
- `let i = $index` creates a local variable `i` that contains the current index
- We use `{{ i + 1 }}` to display human-friendly numbering (starting from 1 instead of 0)

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

**Explanation:** When Angular updates a list, it doesn't know which items have changed by default, so it destroys and recreates all DOM elements. The TrackBy function tells Angular how to identify each item uniquely (using `item.id`). This means Angular only updates the DOM elements that actually changed, making the app much faster with large lists.

**Usage in template:**

```html
<div *ngFor="let product of products; trackBy: trackItem">
```

**NgIf with NgContainer (Multiple Directives):**

```html
<ng-container *ngFor="let product of products">
  <div *ngIf="product.quantity > 0">
    <!-- Product card -->
  </div>
</ng-container>
```

**Explanation:** You cannot use two structural directives (`*ngFor` and `*ngIf`) on the same element. `<ng-container>` is Angular's solution - it's a logical container that doesn't create an actual HTML element. We put `*ngFor` on the container and `*ngIf` on the inner div. This way, we loop through products and only show those with quantity > 0.

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

**Explanation:** Angular 17 introduced new control flow syntax that's more intuitive:

- `@for...@empty`: Loops through items, shows empty state if list is empty
- `@if`: Simple conditional rendering (replaces `*ngIf`)
- `@switch/@case/@default`: Multi-condition branching (replaces `*ngSwitch`)
This syntax is more readable and performant than the old directive-based approach.

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
  selector: '[appHighlightCard]', // Attribute selector (used like an HTML attribute)
})
export class HighlightCard implements OnChanges {
  @Input() externalcolor: string = 'black';        // Color on hover
  @Input('appHighlightCard') defaultColor: string = 'gray'; // Default color

  constructor(private element: ElementRef) {}
  // ElementRef gives us access to the DOM element this directive is applied to

  ngOnChanges() {
    // This lifecycle method runs when input properties change
    // Set the initial background color
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseover') mouseOver() {
    // @HostListener listens to DOM events on the host element
    // When mouse enters, change to external color
    this.element.nativeElement.style.backgroundColor = this.externalcolor;
  }

  @HostListener('mouseout') mouseOut() {
    // When mouse leaves, return to default color
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

**Explanation:**

- `appHighlightCard="gray"` sets the default color (what the element looks like normally)
- `externalcolor="pink"` sets the hover color (what it looks like when mouse hovers over it)
- The directive automatically handles the color changes on mouse events

---

## 🔧 Angular Pipes

Pipes transform displayed values without changing the original data.

### Built-in Pipes

```html
<!-- Currency pipe -->
Price: {{ product.price | currency : "EUR" : "code" }}
<!-- Takes: 100, Shows: "EUR 100.00" -->

<!-- Date pipe -->
{{ today | date : 'shortDate' }}
<!-- Takes: Date object, Shows: "12/25/2023" -->
```

**Explanation:** Pipes use the `|` symbol and transform data for display without changing the original value. The currency pipe takes parameters after colons: currency type ("EUR") and display format ("code" shows currency code).

### Custom Pipe

**Generate Pipe:**

```bash
ng g pipe square
```

**Square Pipe Implementation:**

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'square', // This is how we'll use it in templates
})
export class SquarePipe implements PipeTransform {
  // transform method is required - it receives the value and any parameters
  transform(value: number, pow: number): number {
    return Math.pow(value, pow); // Math.pow(3, 2) = 9 (3 to the power of 2)
  }
}
```

**Explanation:** Custom pipes must implement the `PipeTransform` interface and have a `transform` method. This pipe takes a number and raises it to a specified power. The first parameter after `|` becomes the `pow` parameter.

**Usage:**

```html
<h2>{{ num | square : 3 }}</h2>
<!-- If num = 5, this displays: 125 (5 to the power of 3) -->
```

**Explanation:** We use our custom pipe by writing `num | square : 3`. The `num` value goes to the `value` parameter, and `3` goes to the `pow` parameter of our transform method.

---

## 🔄 Component Lifecycle & Communication

### Parent-Child Communication

#### **Parent to Child (@Input)**

**Child Component (Products):**

```typescript
export class Products implements OnChanges {
  @Input() recieveCategoryID: number = 0; // Receives data from parent
  
  ngOnChanges() {
    // This lifecycle hook runs every time an @Input property changes
    // Perfect place to react to changes from parent
    this.filterProducts(); // React to input changes
  }
  
  filterProducts() {
    if (this.recieveCategoryID == 0) {
      // If 0 is selected, show all products
      this.filteredProducts = this.products;
    } else {
      // Otherwise, filter products by the selected category
      this.filteredProducts = this.products.filter(
        prod => prod.categoryID == this.recieveCategoryID
      );
    }
  }
}
```

**Explanation:** `@Input()` decorator makes a property receivable from parent components. When parent changes the input value, `ngOnChanges()` is triggered automatically. We use this to filter products whenever the category selection changes in the parent.

**Parent Template (Order):**

```html
<app-products [recieveCategoryID]="selectedCategoryID"></app-products>
```

**Explanation:** Square brackets `[]` indicate property binding. We're passing the parent's `selectedCategoryID` value to the child's `recieveCategoryID` input property. When `selectedCategoryID` changes in parent, the child automatically receives the new value.

#### **Child to Parent (@Output)**

**Child Component (Products):**

```typescript
export class Products {
  // EventEmitter is like a custom event broadcaster
  @Output() onTotalPriceChanges: EventEmitter<number> = new EventEmitter<number>();
  totalPriceNumber: number = 0;

  Buy(count: string, price: number) {
    // Calculate new total price
    this.totalPriceNumber += Number(count) * price;
    // Broadcast the new total to any listening parent components
    this.onTotalPriceChanges.emit(this.totalPriceNumber); // Emit event
  }
}
```

**Explanation:** `@Output()` with `EventEmitter` creates a custom event that parent components can listen to. When `emit()` is called, it sends data to the parent. `EventEmitter<number>` means we're sending number data. This allows child to notify parent when something important happens.

**Parent Component (Order):**

```typescript
export class Order {
  recivedTotalPrice: number = 0;

  // This method will be called when child emits an event
  calculateTotalPrice(totalPrice: number) {
    // Receive the total price from child and store it
    this.recivedTotalPrice = totalPrice;
  }
}
```

**Explanation:** This method acts as an event handler. When the child component emits an event, this method receives the emitted data (totalPrice) and can act on it. Here we simply store it to display in the parent template.

**Parent Template:**

```html
<app-products 
  [recieveCategoryID]="selectedCategoryID"
  (onTotalPriceChanges)="calculateTotalPrice($event)">
</app-products>
<h1>Total: {{ recivedTotalPrice }}</h1>
```

**Explanation:**

- `[recieveCategoryID]="..."` sends data TO child (parent-to-child)
- `(onTotalPriceChanges)="..."` listens FOR events FROM child (child-to-parent)
- `$event` is a special variable containing the data emitted by the child
- The `h1` displays the total price received from the child, creating a complete parent-child communication cycle

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
import { CommonModule } from '@angular/common';         // For *ngFor, *ngIf, pipes
import { FormsModule } from '@angular/forms';           // For ngModel
import { HighlightCard } from '../../directives/highlight-card';  // Custom directive
import { SquarePipe } from '../../pipes/square-pipe';   // Custom pipe

@Component({
  selector: 'app-products',                    // HTML tag name
  imports: [CommonModule, FormsModule, HighlightCard, SquarePipe], // Dependencies
  templateUrl: './products.html',             // HTML template path  
  styleUrl: './products.css',                 // CSS styles path
})
export class Products implements OnChanges {
  // Array to hold all products (simulates database data)
  products: Iproduct[] = [
    {
      id: 100,           // Unique identifier
      name: 'laptop 1',  // Product name
      price: 100,        // Price in currency units
      quantity: 0,       // Stock quantity (0 means out of stock)
      categoryID: 1,     // Links to laptop category
      imageURL: 'https://placehold.co/600x400', // Placeholder image
    },
    // ... more products with different categories
  ];

  filteredProducts: Iproduct[] = []; // Products to display (after filtering)
  totalPriceNumber: number = 0;      // Running total of purchases

  // Input: Receives category filter from parent component
  @Input() recieveCategoryID: number = 0; // 0 means "show all"

  // Output: Sends total price changes to parent component  
  @Output() onTotalPriceChanges: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    // Initialize filtered products to show all products initially
    this.filteredProducts = this.products;
  }

  ngOnChanges() {
    // React to parent changing the category filter
    this.filterProducts();
  }

  Buy(count: string, price: number) {
    // Convert string input to number and calculate cost
    this.totalPriceNumber += Number(count) * price;
    // Notify parent component about the new total
    this.onTotalPriceChanges.emit(this.totalPriceNumber);
  }

  trackItem(index: number, item: Iproduct) {
    // Return unique identifier for performance optimization
    return item.id;
  }

  filterProducts() {
    if (this.recieveCategoryID == 0) {
      // Show all products when "All" is selected
      this.filteredProducts = this.products;
    } else {
      // Show only products matching the selected category
      this.filteredProducts = this.products.filter(
        prod => prod.categoryID == this.recieveCategoryID
      );
    }
  }
}
```

**Explanation:** This component demonstrates multiple Angular concepts:

- **Data Management**: Arrays for products and filtered results
- **Input/Output**: Communication with parent component
- **Lifecycle**: Reacting to input changes with ngOnChanges
- **Business Logic**: Filtering products and calculating totals
- **Performance**: TrackBy for efficient list updates

### Order Component

**TypeScript:**

```typescript
import { Component } from '@angular/core';
import { Icategory } from '../../models/icategory';     // Category interface
import { FormsModule } from '@angular/forms';           // For ngModel on select
import { CommonModule } from '@angular/common';         // For *ngFor
import { Products } from '../products/products';        // Child component

@Component({
  selector: 'app-order',                    // HTML tag name
  imports: [FormsModule, CommonModule, Products], // Dependencies
  templateUrl: './order.html',             // HTML template
  styleUrl: './order.css',                 // CSS styles
})
export class Order {
  // Available categories for the dropdown
  categories: Icategory[] = [
    { id: 1, name: 'laptop' },   // Category for laptop products
    { id: 2, name: 'mobile' },   // Category for mobile products  
    { id: 3, name: 'tablet' },   // Category for tablet products
  ];
  
  selectedCategoryID: number = 0;    // Currently selected category (0 = all)
  recivedTotalPrice: number = 0;     // Total price received from child

  calculateTotalPrice(totalPrice: number) {
    // Event handler for child component's price updates
    // This method is called whenever the child emits onTotalPriceChanges
    this.recivedTotalPrice = totalPrice;
  }
}
```

**Explanation:** This parent component:

- **Manages State**: Holds categories and selection state
- **Acts as Mediator**: Passes category filter to child, receives total from child
- **Coordinates UI**: Controls what products are shown and displays running total
- **Handles Events**: Responds to child component's price change events

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

- Built-in structural directives (*ngFor,*ngIf, *ngSwitch)
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
- **Angular Documentation:** [angular.io](https://angular.io)
- **Bootstrap Documentation:** [getbootstrap.com](https://getbootstrap.com)

Feel free to explore the code, open issues, or contribute improvements! This project represents my journey from Angular basics to more advanced concepts, and I'm excited to continue learning and building with Angular.

---

*Happy coding! 🚀*
