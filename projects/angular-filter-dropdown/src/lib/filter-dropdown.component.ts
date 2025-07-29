import { Component, EventEmitter, Output, Input, OnInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  icon: string;
  options: FilterOption[];
}

@Component({
  selector: 'lib-filter-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss']
})
export class FilterDropdownComponent implements OnInit, OnDestroy {
  // Customizable Input Properties
  @Input() categories: FilterCategory[] = [
    {
      key: 'category1',
      label: 'Category 1',
      icon: 'category',
      options: [
        { value: 'option1', label: 'Option 1', selected: false },
        { value: 'option2', label: 'Option 2', selected: false },
        { value: 'option3', label: 'Option 3', selected: false }
      ]
    },
    {
      key: 'category2',
      label: 'Category 2',
      icon: 'label',
      options: [
        { value: 'optionA', label: 'Option A', selected: false },
        { value: 'optionB', label: 'Option B', selected: false },
        { value: 'optionC', label: 'Option C', selected: false }
      ]
    }
  ];

  // Customizable Text Properties
  @Input() buttonText: string = 'Filter';
  @Input() buttonIcon: string = 'filter_list';
  @Input() buttonColor: string = 'primary';
  @Input() panelTitle: string = 'Filters';
  @Input() panelIcon: string = 'filter_list';
  @Input() clearAllText: string = 'Clear All';
  @Input() closeText: string = 'Close';
  @Input() applyText: string = 'Apply';

  // Appearance Customization Properties
  @Input() primaryColor: string = '#3f51b5';
  @Input() primaryHoverColor: string = '#303f9f';
  @Input() backgroundColor: string = '#fff';
  @Input() backgroundHoverColor: string = '#f8f9ff';
  @Input() textPrimaryColor: string = '#333';
  @Input() textSecondaryColor: string = '#666';
  @Input() borderColor: string = '#e0e0e0';
  @Input() borderRadius: string = '8px';
  @Input() panelMinWidth: string = '400px';
  @Input() panelMaxWidth: string = '500px';
  @Input() panelMaxHeight: string = '400px';
  @Input() fontSize: string = '16px';
  @Input() fontWeight: string = '500';
  @Input() spacing: string = '16px';
  @Input() shadowColor: string = 'rgba(0, 0, 0, 0.15)';
  @Input() badgeColor: string = '#f44336';
  @Input() customCssClass: string = '';
  @Input() enableAnimations: boolean = true;
  @Input() closeOnClickOutside: boolean = true;

  // Output Events
  @Output() filtersApplied = new EventEmitter<FilterData>();
  @Output() filtersCleared = new EventEmitter<void>();

  // Component State
  isOpen = false;
  dropdownStates: boolean[] = [];

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isOpen && this.closeOnClickOutside && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeFilterPanel();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isOpen) {
      this.closeFilterPanel();
      event.preventDefault();
    }
  }

  ngOnInit() {
    // Initialize dropdown states
    this.dropdownStates = new Array(this.categories.length).fill(false);
    
    // Apply custom CSS properties
    this.applyCustomStyles();
  }

  private applyCustomStyles() {
    // Check if we're in a browser environment
    if (typeof document !== 'undefined') {
      const hostElement = document.querySelector('lib-filter-dropdown') as HTMLElement;
      if (hostElement) {
        hostElement.style.setProperty('--color-primary', this.primaryColor);
        hostElement.style.setProperty('--color-primary-hover', this.primaryHoverColor);
        hostElement.style.setProperty('--color-background', this.backgroundColor);
        hostElement.style.setProperty('--color-background-hover', this.backgroundHoverColor);
        hostElement.style.setProperty('--color-text-primary', this.textPrimaryColor);
        hostElement.style.setProperty('--color-text-secondary', this.textSecondaryColor);
        hostElement.style.setProperty('--color-border', this.borderColor);
        hostElement.style.setProperty('--radius-md', this.borderRadius);
        hostElement.style.setProperty('--panel-min-width', this.panelMinWidth);
        hostElement.style.setProperty('--panel-max-width', this.panelMaxWidth);
        hostElement.style.setProperty('--panel-max-height', this.panelMaxHeight);
        hostElement.style.setProperty('--font-size-md', this.fontSize);
        hostElement.style.setProperty('--font-weight-medium', this.fontWeight);
        hostElement.style.setProperty('--spacing-lg', this.spacing);
        hostElement.style.setProperty('--shadow-md', `0 0.5rem 1.5rem ${this.shadowColor}`);
        hostElement.style.setProperty('--color-danger', this.badgeColor);
        
        if (!this.enableAnimations) {
          hostElement.style.setProperty('--transition-fast', '0s');
          hostElement.style.setProperty('--transition-normal', '0s');
        }
      }
    }
  }

  ngOnDestroy() {
    // Cleanup if needed - HostListener decorators are automatically cleaned up
  }

  toggleFilterPanel() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.dropdownStates.fill(false);
    }
  }

  closeFilterPanel() {
    this.isOpen = false;
    this.dropdownStates.fill(false);
  }

  toggleCategoryDropdown(index: number) {
    this.dropdownStates[index] = !this.dropdownStates[index];
    // Close other dropdowns
    for (let i = 0; i < this.dropdownStates.length; i++) {
      if (i !== index) {
        this.dropdownStates[i] = false;
      }
    }
  }

  onOptionChange(option: FilterOption) {
    option.selected = !option.selected;
  }

  clearAll() {
    this.categories.forEach(category => {
      category.options.forEach(option => option.selected = false);
    });
    this.filtersCleared.emit();
  }

  apply() {
    const result: FilterData = {};
    
    this.categories.forEach(category => {
      result[category.key] = category.options
        .filter(option => option.selected)
        .map(option => option.value);
    });

    this.filtersApplied.emit(result);
    this.closeFilterPanel();
  }

  getTotalSelectedCount(): number {
    return this.categories.reduce((total, category) => {
      return total + category.options.filter(option => option.selected).length;
    }, 0);
  }

}
