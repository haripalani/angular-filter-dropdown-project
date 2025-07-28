import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterDropdownComponent } from './filter-dropdown.component';

describe('FilterDropdownComponent', () => {
  let component: FilterDropdownComponent;
  let fixture: ComponentFixture<FilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterDropdownComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filter panel', () => {
    expect(component.isOpen).toBeFalse();
    component.toggleFilterPanel();
    expect(component.isOpen).toBeTrue();
  });

  it('should emit filters when applied', () => {
    spyOn(component.filtersApplied, 'emit');
    component.categories[0].options[0].selected = true;
    component.apply();
    
    expect(component.filtersApplied.emit).toHaveBeenCalledWith({
      category1: ['option1'],
      category2: []
    });
  });

  it('should clear all filters', () => {
    component.categories[0].options[0].selected = true;
    component.categories[1].options[0].selected = true;
    
    component.clearAll();
    
    expect(component.categories[0].options[0].selected).toBeFalse();
    expect(component.categories[1].options[0].selected).toBeFalse();
  });

  it('should count total selected options', () => {
    component.categories[0].options[0].selected = true;
    component.categories[0].options[1].selected = true;
    component.categories[1].options[0].selected = true;
    
    expect(component.getTotalSelectedCount()).toBe(3);
  });
});
