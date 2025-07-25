import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFilterDropdownComponent } from './angular-filter-dropdown.component';

describe('AngularFilterDropdownComponent', () => {
  let component: AngularFilterDropdownComponent;
  let fixture: ComponentFixture<AngularFilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFilterDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularFilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
