import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLawyerComponent } from './add-lawyer.component';

describe('AddLawyerComponent', () => {
  let component: AddLawyerComponent;
  let fixture: ComponentFixture<AddLawyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLawyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
