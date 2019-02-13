import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EChannelsErrorComponent } from './e-channels-error.component';

describe('EChannelsErrorComponent', () => {
  let component: EChannelsErrorComponent;
  let fixture: ComponentFixture<EChannelsErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EChannelsErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EChannelsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
