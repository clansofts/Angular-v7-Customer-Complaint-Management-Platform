import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesTrackingComponent } from './issues.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboadDefaultComponent } from '../customer-complaints/dashboad-default.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('IssuesTrackingComponent', () => {
  let component: IssuesTrackingComponent;
  let fixture: ComponentFixture<IssuesTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesTrackingComponent ],
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
    fixture = TestBed.createComponent(IssuesTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
