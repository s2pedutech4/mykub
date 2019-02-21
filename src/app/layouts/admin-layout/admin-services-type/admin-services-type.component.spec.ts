import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesTypeComponent } from './admin-services-type.component';

describe('AdminServicesTypeComponent', () => {
  let component: AdminServicesTypeComponent;
  let fixture: ComponentFixture<AdminServicesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminServicesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServicesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
