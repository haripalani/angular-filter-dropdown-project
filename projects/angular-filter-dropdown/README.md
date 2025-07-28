# `hp-filter-dropdown` Component Documentation

This document provides instructions and examples for integrating and using the `hp-filter-dropdown` Angular component in your application. This component offers a modern, multi-select filter modal, ideal for various data filtering needs.

## Installation

To use the `hp-filter-dropdown` component, you first need to install it via npm:

```bash
npm i hp-filter-dropdown
```

## Module Import

After installation, import the `HpFilterDropdownModule` into your Angular module (e.g., `app.module.ts`):

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HpFilterDropdownModule } from 'hp-filter-dropdown';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    HpFilterDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Note:** This component relies on Angular Material. Ensure you have Angular Material installed and configured in your project. The necessary Material modules (`MatButtonModule`, `MatIconModule`, `MatCheckboxModule`) are included in the example above for completeness.

## Component Usage

The `hp-filter-dropdown` component can be used in your Angular templates using its selector: `lib-filter-dropdown`.

### Inputs

The component accepts the following `@Input()` properties to customize its behavior and appearance:

| Property Name | Type | Description | Default Value |
|---|---|---|---|
| `categories` | `FilterCategory[]` | An array defining the filter categories and their options. See `FilterCategory` interface below. | `[]` (empty array) |
| `buttonText` | `string` | Text displayed on the filter button. | `Filter` |
| `buttonIcon` | `string` | Material icon name for the filter button. | `filter_list` |
| `buttonColor` | `string` | Color of the filter button (e.g., `primary`, `accent`, `warn`). | `primary` |
| `panelTitle` | `string` | Title displayed at the top of the filter modal panel. | `Filters` |
| `panelIcon` | `string` | Material icon name for the filter panel title. | `filter_list` |
| `clearAllText` | `string` | Text for the 'Clear All' button within the modal. | `Clear All` |
| `closeText` | `string` | Text for the 'Close' button within the modal. | `Close` |
| `applyText` | `string` | Text for the 'Apply' button within the modal. | `Apply` |

### Outputs

The component emits the following `@Output()` events:

| Event Name | Payload Type | Description |
|---|---|---|
| `filtersApplied` | `FilterData` | Emits when the 'Apply' button is clicked, providing the currently selected filter data. | 
| `filtersCleared` | `void` | Emits when the 'Clear All' button is clicked. | 

### Interfaces

Here are the TypeScript interfaces used for the `categories` input and `filtersApplied` output:

```typescript
export interface FilterData {
  [key: string]: string[];
}

export interface FilterOption {
  value: string;
  label: string;
  selected: boolean;
}

export interface FilterCategory {
  key: string;
  label: string;
  icon?: string;
  options: FilterOption[];
}
```

## Example Usage

Here's a complete example of how to use the `hp-filter-dropdown` component in your `app.component.html` and `app.component.ts` files.

### `app.component.html`

```html
<div class="app-container">
  <header class="app-header">
    <h1>Filter Dropdown Demo</h1>
    <p>Angular 19+ with Material Design Filter Dropdown Component</p>
  </header>

  <main class="app-main">
    <section class="filter-section">
      <lib-filter-dropdown
        [categories]="filterCategories"
        [buttonText]="'Filter'"
        [buttonIcon]="'filter_list'"
        [buttonColor]="'primary'"
        [panelTitle]="'Filters'"
        [panelIcon]="'filter_list'"
        [clearAllText]="'Clear All'"
        [closeText]="'Close'"
        [applyText]="'Apply'"
        (filtersApplied)="onFiltersApplied($event)"
        (filtersCleared)="onFiltersCleared()"
      ></lib-filter-dropdown>

      <div *ngIf="getActiveFiltersCount() > 0" class="active-filters">
        <h3>Active Filters:</h3>
        <mat-chip-set>
          <mat-chip *ngFor="let filter of currentFilters.flexwerkerLocatie" class="filter-chip">
            Flexwerker: {{ filter }}
          </mat-chip>
          <mat-chip *ngFor="let filter of currentFilters.mtlRelatieLocatie" class="filter-chip">
            MTL Relatie: {{ filter }}
          </mat-chip>
        </mat-chip-set>
      </div>
    </section>
  </main>
</div>
```

### `app.component.ts`

```typescript
import { Component } from '@angular/core';
import { FilterCategory, FilterData } from 'hp-filter-dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filter-modal-project';

  filterCategories: FilterCategory[] = [
    {
      key: 'flexwerkerLocatie',
      label: 'Flexwerker locatie',
      icon: 'category',
      options: [
        { value: 'FR', label: 'FR', selected: false },
        { value: 'FZ', label: 'FZ', selected: false },
        { value: 'FE', label: 'FE', selected: false },
        { value: 'FME', label: 'FME', selected: false }
      ]
    },
    {
      key: 'mtlRelatieLocatie',
      label: 'MTLRelatie locatie',
      icon: 'category',
      options: [
        { value: 'FR', label: 'FR', selected: false },
        { value: 'FZ', label: 'FZ', selected: false },
        { value: 'FE', label: 'FE', selected: false },
        { value: 'FME', label: 'FME', selected: false },
        { value: 'MTL', label: 'MTL', selected: false }
      ]
    }
  ];

  currentFilters: FilterData = {};

  onFiltersApplied(filters: FilterData) {
    this.currentFilters = filters;
    console.log('Filters Applied:', this.currentFilters);
  }

  onFiltersCleared() {
    this.currentFilters = {};
    console.log('Filters Cleared');
  }

  getActiveFiltersCount(): number {
    let count = 0;
    for (const key in this.currentFilters) {
      if (this.currentFilters.hasOwnProperty(key)) {
        count += this.currentFilters[key].length;
      }
    }
    return count;
  }
}
```

### `app.component.scss`

```scss
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;

  h1 {
    color: #333;
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 8px;
  }

  p {
    color: #666;
    font-size: 1.1rem;
    margin: 0;
  }
}

.app-main {
  max-width: 800px;
  margin: 0 auto;
}

.filter-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.active-filters {
  margin-top: 20px;
  h3 {
    color: #555;
    margin-bottom: 10px;
  }
  mat-chip-set {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .filter-chip {
    background-color: #e0e0e0;
    color: #333;
    padding: 5px 10px;
    border-radius: 16px;
  }
}
```

## Contributing

If you wish to contribute to the `hp-filter-dropdown` library, you can find the source code on GitHub: [https://github.com/haripalani/angular-filter-dropdown-project](https://github.com/haripalani/angular-filter-dropdown-project)

## License

This project is licensed under the MIT License.

