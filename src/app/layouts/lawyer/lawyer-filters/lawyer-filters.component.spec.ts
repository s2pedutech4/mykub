import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerFiltersComponent } from './lawyer-filters.component';

describe('LawyerFiltersComponent', () => {
  let component: LawyerFiltersComponent;
  let fixture: ComponentFixture<LawyerFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
