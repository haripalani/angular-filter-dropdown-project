import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
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
export class FilterDropdownComponent implements OnInit {
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

  // Output Events
  @Output() filtersApplied = new EventEmitter<FilterData>();
  @Output() filtersCleared = new EventEmitter<void>();

  // Component State
  isOpen = false;
  dropdownStates: boolean[] = [];

  ngOnInit() {
    // Initialize dropdown states
    this.dropdownStates = new Array(this.categories.length).fill(false);
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
