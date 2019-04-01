import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeDialogComponent } from './compose-dialog.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { LaddaModule } from 'angular2-ladda';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

describe('ComposeDialogComponent', () => {
  let component: ComposeDialogComponent;
  let fixture: ComponentFixture<ComposeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComposeDialogComponent],
      imports: [],
      providers: [
        NgbActiveModal
      ],
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
