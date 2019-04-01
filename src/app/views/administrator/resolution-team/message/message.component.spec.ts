import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageRTComponent } from './message.component';
import { AdminComponent } from '../../admin.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MessageRTComponent', () => {
  let component: MessageRTComponent;
  let fixture: ComponentFixture<MessageRTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MessageRTComponent,
       ],
      imports: [RouterTestingModule],
      providers: [AdminComponent]
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
