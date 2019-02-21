import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddServicesTypeComponent } from './admin-add-services-type.component';

describe('AdminAddServicesTypeComponent', () => {
  let component: AdminAddServicesTypeComponent;
  let fixture: ComponentFixture<AdminAddServicesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddServicesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddServicesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
