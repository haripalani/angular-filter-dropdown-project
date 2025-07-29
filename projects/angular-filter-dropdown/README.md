# Angular Filter Dropdown - Enhanced Features

## Overview

This document outlines the enhancements made to the Angular Filter Dropdown component, adding comprehensive appearance customization and improved user experience features.

## New Features

### 1. Appearance Customization

The component now supports extensive appearance customization through input properties:

#### Color Customization
- `primaryColor`: Primary color for buttons and accents (default: '#3f51b5')
- `primaryHoverColor`: Hover state color for primary elements (default: '#303f9f')
- `backgroundColor`: Background color for panels and dropdowns (default: '#fff')
- `backgroundHoverColor`: Hover state background color (default: '#f8f9ff')
- `textPrimaryColor`: Primary text color (default: '#333')
- `textSecondaryColor`: Secondary text color (default: '#666')
- `borderColor`: Border color for elements (default: '#e0e0e0')
- `badgeColor`: Color for filter count badge (default: '#f44336')

#### Layout and Sizing
- `borderRadius`: Border radius for rounded corners (default: '8px')
- `panelMinWidth`: Minimum width of the filter panel (default: '400px')
- `panelMaxWidth`: Maximum width of the filter panel (default: '500px')
- `panelMaxHeight`: Maximum height of the filter panel (default: '400px')
- `fontSize`: Base font size (default: '16px')
- `fontWeight`: Font weight for text (default: '500')
- `spacing`: Base spacing unit (default: '16px')

#### Visual Effects
- `shadowColor`: Shadow color for dropdowns (default: 'rgba(0, 0, 0, 0.15)')
- `enableAnimations`: Enable/disable animations (default: true)
- `customCssClass`: Add custom CSS classes for advanced styling

### 2. Click Outside to Close

The dropdown now automatically closes when users click outside the component:

- **Automatic Detection**: Uses Angular's HostListener to detect clicks outside the component
- **Configurable**: Can be disabled using the `closeOnClickOutside` property (default: true)
- **Smart Targeting**: Only closes when clicking truly outside the component boundaries

### 3. Keyboard Support

Enhanced keyboard accessibility:

- **ESC Key**: Press ESC to close the dropdown
- **Focus Management**: Proper focus handling for accessibility

## Usage Examples

### Basic Usage with Default Styling

```typescript
<lib-filter-dropdown
  [categories]="categories"
  (filtersApplied)="onFiltersApplied($event)"
  (filtersCleared)="onFiltersCleared()">
</lib-filter-dropdown>
```

### Custom Dark Theme

```typescript
<lib-filter-dropdown
  [categories]="categories"
  [primaryColor]="'#6366f1'"
  [primaryHoverColor]="'#4f46e5'"
  [backgroundColor]="'#1f2937'"
  [backgroundHoverColor]="'#374151'"
  [textPrimaryColor]="'#f9fafb'"
  [textSecondaryColor]="'#d1d5db'"
  [borderColor]="'#4b5563'"
  [borderRadius]="'12px'"
  [buttonText]="'Custom Filter'"
  [panelTitle]="'Advanced Filters'"
  (filtersApplied)="onFiltersApplied($event)">
</lib-filter-dropdown>
```

### Compact Style with Disabled Click Outside

```typescript
<lib-filter-dropdown
  [categories]="categories"
  [primaryColor]="'#059669'"
  [borderRadius]="'6px'"
  [fontSize]="'12px'"
  [spacing]="'8px'"
  [panelMinWidth]="'300px'"
  [closeOnClickOutside]="false"
  [enableAnimations]="false"
  (filtersApplied)="onFiltersApplied($event)">
</lib-filter-dropdown>
```

## API Reference

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `categories` | `FilterCategory[]` | `[]` | Filter categories and options |
| `buttonText` | `string` | `'Filter'` | Text displayed on the filter button |
| `buttonIcon` | `string` | `'filter_list'` | Material icon for the button |
| `buttonColor` | `string` | `'primary'` | Material button color |
| `panelTitle` | `string` | `'Filters'` | Title displayed in the filter panel |
| `panelIcon` | `string` | `'filter_list'` | Material icon for the panel header |
| `clearAllText` | `string` | `'Clear All'` | Text for clear all button |
| `closeText` | `string` | `'Close'` | Text for close button |
| `applyText` | `string` | `'Apply'` | Text for apply button |
| `primaryColor` | `string` | `'#3f51b5'` | Primary color |
| `primaryHoverColor` | `string` | `'#303f9f'` | Primary hover color |
| `backgroundColor` | `string` | `'#fff'` | Background color |
| `backgroundHoverColor` | `string` | `'#f8f9ff'` | Background hover color |
| `textPrimaryColor` | `string` | `'#333'` | Primary text color |
| `textSecondaryColor` | `string` | `'#666'` | Secondary text color |
| `borderColor` | `string` | `'#e0e0e0'` | Border color |
| `borderRadius` | `string` | `'8px'` | Border radius |
| `panelMinWidth` | `string` | `'400px'` | Panel minimum width |
| `panelMaxWidth` | `string` | `'500px'` | Panel maximum width |
| `panelMaxHeight` | `string` | `'400px'` | Panel maximum height |
| `fontSize` | `string` | `'16px'` | Base font size |
| `fontWeight` | `string` | `'500'` | Font weight |
| `spacing` | `string` | `'16px'` | Base spacing unit |
| `shadowColor` | `string` | `'rgba(0, 0, 0, 0.15)'` | Shadow color |
| `badgeColor` | `string` | `'#f44336'` | Badge color |
| `customCssClass` | `string` | `''` | Custom CSS class |
| `enableAnimations` | `boolean` | `true` | Enable animations |
| `closeOnClickOutside` | `boolean` | `true` | Close on outside click |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `filtersApplied` | `EventEmitter<FilterData>` | Emitted when filters are applied |
| `filtersCleared` | `EventEmitter<void>` | Emitted when filters are cleared |

## Implementation Details

### CSS Custom Properties

The component uses CSS custom properties (CSS variables) for theming, which are dynamically updated based on input properties:

```scss
:host {
  --color-primary: #3f51b5;
  --color-background: #fff;
  --radius-md: 8px;
  // ... other properties
}
```

### Click Outside Detection

The click outside functionality is implemented using Angular's `@HostListener`:

```typescript
@HostListener('document:click', ['$event'])
onDocumentClick(event: Event) {
  if (this.isOpen && this.closeOnClickOutside && !this.elementRef.nativeElement.contains(event.target)) {
    this.closeFilterPanel();
  }
}
```

### Keyboard Support

ESC key support is implemented for accessibility:

```typescript
@HostListener('document:keydown.escape', ['$event'])
onEscapeKey(event: KeyboardEvent) {
  if (this.isOpen) {
    this.closeFilterPanel();
    event.preventDefault();
  }
}
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Accessibility Features

- Keyboard navigation support
- ARIA labels and roles
- High contrast mode support
- Reduced motion support
- Focus management

## Migration Guide

### From Previous Version

The enhancements are fully backward compatible. Existing implementations will continue to work without changes. To use the new features, simply add the desired input properties:

```typescript
// Before
<lib-filter-dropdown [categories]="categories"></lib-filter-dropdown>

// After (with customization)
<lib-filter-dropdown 
  [categories]="categories"
  [primaryColor]="'#your-color'"
  [closeOnClickOutside]="true">
</lib-filter-dropdown>
```

## Performance Considerations

- CSS custom properties are updated only once during component initialization
- Event listeners are automatically cleaned up when the component is destroyed
- Animations can be disabled for better performance on low-end devices
- The component uses OnPush change detection strategy for optimal performance

## Contributing

When contributing to this component, please ensure:

1. All new features are backward compatible
2. CSS custom properties are used for styling
3. Accessibility guidelines are followed
4. Unit tests are updated
5. Documentation is updated

## License

This component is licensed under the same license as the original project.

# Angular Filter Dropdown - Usage Examples

## Quick Start

### 1. Basic Implementation

```typescript
import { Component } from '@angular/core';
import { FilterDropdownComponent, FilterData, FilterCategory } from 'angular-filter-dropdown';

@Component({
  selector: 'app-example',
  imports: [FilterDropdownComponent],
  template: `
    <lib-filter-dropdown
      [categories]="categories"
      (filtersApplied)="onFiltersApplied($event)"
      (filtersCleared)="onFiltersCleared()">
    </lib-filter-dropdown>
  `
})
export class ExampleComponent {
  categories: FilterCategory[] = [
    {
      key: 'location',
      label: 'Location',
      icon: 'location_on',
      options: [
        { value: 'ny', label: 'New York', selected: false },
        { value: 'la', label: 'Los Angeles', selected: false }
      ]
    }
  ];

  onFiltersApplied(filters: FilterData) {
    console.log('Applied filters:', filters);
  }

  onFiltersCleared() {
    console.log('Filters cleared');
  }
}
```

## Styling Examples

### 2. Dark Theme

```typescript
<lib-filter-dropdown
  [categories]="categories"
  [primaryColor]="'#6366f1'"
  [primaryHoverColor]="'#4f46e5'"
  [backgroundColor]="'#1f2937'"
  [backgroundHoverColor]="'#374151'"
  [textPrimaryColor]="'#f9fafb'"
  [textSecondaryColor]="'#d1d5db'"
  [borderColor]="'#4b5563'"
  [borderRadius]="'12px'"
  [badgeColor]="'#ef4444'"
  [buttonText]="'Dark Filter'"
  [panelTitle]="'Dark Filters'"
  (filtersApplied)="onFiltersApplied($event)">
</lib-filter-dropdown>
```

### 3. Compact Style

```typescript
<lib-filter-dropdown
  [categories]="categories"
  [primaryColor]="'#059669'"
  [borderRadius]="'6px'"
  [fontSize]="'12px'"
  [spacing]="'8px'"
  [panelMinWidth]="'300px'"
  [panelMaxWidth]="'350px'"
  [buttonText]="'Quick Filter'"
  [enableAnimations]="false"
  (filtersApplied)="onFiltersApplied($event)">
</lib-filter-dropdown>
```

### 4. Corporate Theme

```typescript
<lib-filter-dropdown
  [categories]="categories"
  [primaryColor]="'#0066cc'"
  [primaryHoverColor]="'#0052a3'"
  [backgroundColor]="'#ffffff'"
  [backgroundHoverColor]="'#f8f9fa'"
  [textPrimaryColor]="'#212529'"
  [textSecondaryColor]="'#6c757d'"
  [borderColor]="'#dee2e6'"
  [borderRadius]="'4px'"
  [fontSize]="'14px'"
  [fontWeight]="'400'"
  [buttonText]="'Apply Filters'"
  [panelTitle]="'Filter Options'"
  [customCssClass]="'corporate-theme'"
  (filtersApplied)="onFiltersApplied($event)">
</lib-filter-dropdown>
```

## Behavior Customization

### 5. Disable Click Outside to Close

```typescript
<lib-filter-dropdown
  [categories]="categories"
  [closeOnClickOutside]="false"
  [buttonText]="'Manual Close Only'"
  (filtersApplied)="onFiltersApplied($event)">
</lib-filter-dropdown>
```

### 6. No Animations (Performance Mode)

```typescript
<lib-filter-dropdown
  [categories]="categories"
  [enableAnimations]="false"
  [buttonText]="'Fast Filter'"
  (filtersApplied)="onFiltersApplied($event)">
</lib-filter-dropdown>
```

## Advanced Examples

### 7. Dynamic Categories

```typescript
export class DynamicExampleComponent {
  categories: FilterCategory[] = [];

  ngOnInit() {
    // Load categories from API
    this.loadCategories();
  }

  loadCategories() {
    // Simulate API call
    this.categories = [
      {
        key: 'dynamic-category',
        label: 'Dynamic Category',
        icon: 'dynamic_feed',
        options: this.generateDynamicOptions()
      }
    ];
  }

  generateDynamicOptions() {
    return Array.from({ length: 10 }, (_, i) => ({
      value: `option-${i}`,
      label: `Dynamic Option ${i + 1}`,
      selected: false
    }));
  }
}
```

### 8. Multiple Filter Instances

```typescript
@Component({
  template: `
    <div class="filter-container">
      <!-- Primary Filters -->
      <lib-filter-dropdown
        [categories]="primaryCategories"
        [primaryColor]="'#3f51b5'"
        [buttonText]="'Primary Filters'"
        (filtersApplied)="onPrimaryFiltersApplied($event)">
      </lib-filter-dropdown>

      <!-- Secondary Filters -->
      <lib-filter-dropdown
        [categories]="secondaryCategories"
        [primaryColor]="'#ff9800'"
        [buttonText]="'Secondary Filters'"
        [panelMinWidth]="'300px'"
        (filtersApplied)="onSecondaryFiltersApplied($event)">
      </lib-filter-dropdown>
    </div>
  `,
  styles: [`
    .filter-container {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
  `]
})
export class MultipleFiltersComponent {
  primaryCategories: FilterCategory[] = [
    // Primary filter categories
  ];

  secondaryCategories: FilterCategory[] = [
    // Secondary filter categories
  ];

  onPrimaryFiltersApplied(filters: FilterData) {
    console.log('Primary filters:', filters);
  }

  onSecondaryFiltersApplied(filters: FilterData) {
    console.log('Secondary filters:', filters);
  }
}
```

### 9. Custom CSS Classes

```scss
// In your component's SCSS file
.custom-filter-theme {
  // Override specific styles
  .filter-button {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease;
    }
  }

  .filter-panel {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
  }
}
```

```typescript
<lib-filter-dropdown
  [categories]="categories"
  [customCssClass]="'custom-filter-theme'"
  (filtersApplied)="onFiltersApplied($event)">
</lib-filter-dropdown>
```

### 10. Responsive Design

```typescript
export class ResponsiveExampleComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateFilterConfig();
  }

  filterConfig = {
    panelMinWidth: '400px',
    panelMaxWidth: '500px',
    fontSize: '16px',
    spacing: '16px'
  };

  ngOnInit() {
    this.updateFilterConfig();
  }

  updateFilterConfig() {
    const width = window.innerWidth;
    
    if (width < 768) {
      // Mobile
      this.filterConfig = {
        panelMinWidth: '280px',
        panelMaxWidth: '90vw',
        fontSize: '14px',
        spacing: '12px'
      };
    } else if (width < 1024) {
      // Tablet
      this.filterConfig = {
        panelMinWidth: '350px',
        panelMaxWidth: '450px',
        fontSize: '15px',
        spacing: '14px'
      };
    } else {
      // Desktop
      this.filterConfig = {
        panelMinWidth: '400px',
        panelMaxWidth: '500px',
        fontSize: '16px',
        spacing: '16px'
      };
    }
  }
}
```

```typescript
<lib-filter-dropdown
  [categories]="categories"
  [panelMinWidth]="filterConfig.panelMinWidth"
  [panelMaxWidth]="filterConfig.panelMaxWidth"
  [fontSize]="filterConfig.fontSize"
  [spacing]="filterConfig.spacing"
  (filtersApplied)="onFiltersApplied($event)">
</lib-filter-dropdown>
```

## Integration Examples

### 11. With Angular Material Table

```typescript
@Component({
  template: `
    <div class="table-controls">
      <lib-filter-dropdown
        [categories]="filterCategories"
        [buttonText]="'Filter Table'"
        (filtersApplied)="applyTableFilters($event)"
        (filtersCleared)="clearTableFilters()">
      </lib-filter-dropdown>
    </div>

    <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <!-- Table columns -->
    </mat-table>
  `
})
export class TableIntegrationComponent {
  dataSource = new MatTableDataSource(this.originalData);
  originalData = [/* your data */];
  filterCategories: FilterCategory[] = [/* filter categories */];

  applyTableFilters(filters: FilterData) {
    let filteredData = this.originalData;

    Object.keys(filters).forEach(key => {
      if (filters[key].length > 0) {
        filteredData = filteredData.filter(item => 
          filters[key].includes(item[key])
        );
      }
    });

    this.dataSource.data = filteredData;
  }

  clearTableFilters() {
    this.dataSource.data = this.originalData;
  }
}
```

### 12. With Form Controls

```typescript
@Component({
  template: `
    <form [formGroup]="searchForm">
      <mat-form-field>
        <input matInput placeholder="Search" formControlName="search">
      </mat-form-field>
      
      <lib-filter-dropdown
        [categories]="categories"
        [buttonText]="'Advanced Filters'"
        (filtersApplied)="onFiltersApplied($event)">
      </lib-filter-dropdown>
      
      <button mat-raised-button (click)="performSearch()">Search</button>
    </form>
  `
})
export class FormIntegrationComponent {
  searchForm = this.fb.group({
    search: [''],
    filters: [{}]
  });

  constructor(private fb: FormBuilder) {}

  onFiltersApplied(filters: FilterData) {
    this.searchForm.patchValue({ filters });
  }

  performSearch() {
    const searchData = this.searchForm.value;
    // Perform search with both text and filters
  }
}
```

## Testing Examples

### 13. Unit Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterDropdownComponent } from 'angular-filter-dropdown';

describe('FilterDropdownComponent', () => {
  let component: FilterDropdownComponent;
  let fixture: ComponentFixture<FilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterDropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterDropdownComponent);
    component = fixture.componentInstance;
  });

  it('should close dropdown when clicking outside', () => {
    component.isOpen = true;
    component.closeOnClickOutside = true;
    
    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    
    const event = new MouseEvent('click', { bubbles: true });
    outsideElement.dispatchEvent(event);
    
    expect(component.isOpen).toBeFalse();
    
    document.body.removeChild(outsideElement);
  });

  it('should apply custom colors', () => {
    component.primaryColor = '#ff0000';
    component.ngOnInit();
    
    const hostElement = fixture.nativeElement;
    expect(hostElement.style.getPropertyValue('--color-primary')).toBe('#ff0000');
  });
});
```

## Best Practices

1. **Performance**: Disable animations on mobile devices for better performance
2. **Accessibility**: Always provide meaningful labels and icons
3. **Responsive**: Use viewport-relative units for mobile compatibility
4. **Theming**: Use CSS custom properties for consistent theming
5. **Testing**: Test click-outside behavior in different scenarios
6. **UX**: Provide visual feedback for filter states
7. **Data**: Validate filter data before applying to prevent errors

## Common Patterns

### Filter State Management

```typescript
export class FilterStateService {
  private filtersSubject = new BehaviorSubject<FilterData>({});
  filters$ = this.filtersSubject.asObservable();

  updateFilters(filters: FilterData) {
    this.filtersSubject.next(filters);
  }

  clearFilters() {
    this.filtersSubject.next({});
  }
}
```

### URL Synchronization

```typescript
export class UrlSyncComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  onFiltersApplied(filters: FilterData) {
    const queryParams = this.convertFiltersToQueryParams(filters);
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  private convertFiltersToQueryParams(filters: FilterData) {
    const params: any = {};
    Object.keys(filters).forEach(key => {
      if (filters[key].length > 0) {
        params[key] = filters[key].join(',');
      }
    });
    return params;
  }
}
```

