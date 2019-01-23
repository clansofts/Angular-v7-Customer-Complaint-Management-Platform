import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIssueComponent } from './service-issue.component';

describe('ServiceIssueComponent', () => {
  let component: ServiceIssueComponent;
  let fixture: ComponentFixture<ServiceIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
