import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersDetailsComponent } from './lawyers-details.component';

describe('LawyersDetailsComponent', () => {
  let component: LawyersDetailsComponent;
  let fixture: ComponentFixture<LawyersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
