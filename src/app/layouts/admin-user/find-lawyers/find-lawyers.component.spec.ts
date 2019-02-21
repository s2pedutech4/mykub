import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLawyersComponent } from './find-lawyers.component';

describe('FindLawyersComponent', () => {
  let component: FindLawyersComponent;
  let fixture: ComponentFixture<FindLawyersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindLawyersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
