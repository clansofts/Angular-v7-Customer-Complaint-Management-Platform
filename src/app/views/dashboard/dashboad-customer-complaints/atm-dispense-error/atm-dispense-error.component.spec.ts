import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmDispenseErrorComponent } from './atm-dispense-error.component';

describe('AtmDispenseErrorComponent', () => {
  let component: AtmDispenseErrorComponent;
  let fixture: ComponentFixture<AtmDispenseErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmDispenseErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmDispenseErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
