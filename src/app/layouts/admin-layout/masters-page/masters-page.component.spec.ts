import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersPageComponent } from './masters-page.component';

describe('MastersPageComponent', () => {
  let component: MastersPageComponent;
  let fixture: ComponentFixture<MastersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
