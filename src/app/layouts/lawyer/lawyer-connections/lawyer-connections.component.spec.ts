import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerConnectionsComponent } from './lawyer-connections.component';

describe('LawyerConnectionsComponent', () => {
  let component: LawyerConnectionsComponent;
  let fixture: ComponentFixture<LawyerConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
