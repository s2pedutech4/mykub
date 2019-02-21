import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypeAddComponent } from './service-type-add.component';

describe('ServiceTypeAddComponent', () => {
  let component: ServiceTypeAddComponent;
  let fixture: ComponentFixture<ServiceTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
