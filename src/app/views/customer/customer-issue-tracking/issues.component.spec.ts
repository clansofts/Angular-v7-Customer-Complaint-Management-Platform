import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesTrackingComponent } from './issues.component';

describe('IssuesTrackingComponent', () => {
  let component: IssuesTrackingComponent;
  let fixture: ComponentFixture<IssuesTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
