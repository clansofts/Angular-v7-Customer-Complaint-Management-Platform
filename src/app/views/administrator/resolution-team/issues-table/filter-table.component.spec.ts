import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedIssuesTableComponent } from './filter-table.component';

describe('AssignedIssuesTableComponent', () => {
  let component: AssignedIssuesTableComponent;
  let fixture: ComponentFixture<AssignedIssuesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedIssuesTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedIssuesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
