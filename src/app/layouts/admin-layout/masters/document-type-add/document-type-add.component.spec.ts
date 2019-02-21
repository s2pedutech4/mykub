import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeAddComponent } from './document-type-add.component';

describe('DocumentTypeAddComponent', () => {
  let component: DocumentTypeAddComponent;
  let fixture: ComponentFixture<DocumentTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
