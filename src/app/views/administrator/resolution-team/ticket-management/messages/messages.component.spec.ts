import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesRTComponent } from './messages.component';

describe('MessagesRTComponent', () => {
  let component: MessagesRTComponent;
  let fixture: ComponentFixture<MessagesRTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesRTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesRTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
