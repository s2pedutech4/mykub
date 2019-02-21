import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerSerivesComponent } from './lawyer-serives.component';

describe('LawyerSerivesComponent', () => {
  let component: LawyerSerivesComponent;
  let fixture: ComponentFixture<LawyerSerivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerSerivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerSerivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
