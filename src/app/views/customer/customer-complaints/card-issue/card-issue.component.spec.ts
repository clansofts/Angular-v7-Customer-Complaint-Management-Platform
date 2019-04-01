import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIssueComponent } from './card-issue.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DashboadDefaultComponent } from '../dashboad-default.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardIssueComponent', () => {
  let component: CardIssueComponent;
  let fixture: ComponentFixture<CardIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardIssueComponent ],
      imports: [
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SharedDirectivesModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [DashboadDefaultComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
