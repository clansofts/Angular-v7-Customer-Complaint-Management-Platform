import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIssueComponent } from './service-issue.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboadDefaultComponent } from '../dashboad-default.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ServiceIssueComponent', () => {
  let component: ServiceIssueComponent;
  let fixture: ComponentFixture<ServiceIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceIssueComponent],
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
    fixture = TestBed.createComponent(ServiceIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
