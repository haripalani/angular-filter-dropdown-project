import { Component } from '@angular/core';
import { FilterDropdownComponent, FilterData } from 'angular-filter-dropdown';
@Component({
  selector: 'app-root',
  
  imports: [ FilterDropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentFilters: FilterData | null = null;

  onFiltersApplied(filters: FilterData) {
    this.currentFilters = filters;
    console.log('Applied filters:', filters);
  }

  onFiltersCleared() {
    this.currentFilters = null;
    console.log('Filters cleared');
  }
}
