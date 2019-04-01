import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeDialogComponent } from './compose-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

describe('ComposeDialogComponent', () => {
  let component: ComposeDialogComponent;
  let fixture: ComponentFixture<ComposeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComposeDialogComponent],
      imports: [],
      providers: [NgbActiveModal],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
