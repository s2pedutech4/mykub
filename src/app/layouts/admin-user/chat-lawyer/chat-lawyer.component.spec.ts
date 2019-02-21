import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLawyerComponent } from './chat-lawyer.component';

describe('ChatLawyerComponent', () => {
  let component: ChatLawyerComponent;
  let fixture: ComponentFixture<ChatLawyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatLawyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
