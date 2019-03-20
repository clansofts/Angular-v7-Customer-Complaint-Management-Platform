import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRTComponent } from './message.component';

describe('MessageRTComponent', () => {
  let component: MessageRTComponent;
  let fixture: ComponentFixture<MessageRTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageRTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
