import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboadDefaultComponent } from './dashboad-default.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('DashboadDefaultComponent', () => {
  let component: DashboadDefaultComponent;
  let fixture: ComponentFixture<DashboadDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboadDefaultComponent ],
      imports: [
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SharedDirectivesModule,
        HttpClientModule,
        RouterTestingModule,
        NgxEchartsModule,
        NgxDatatableModule
      ],
      providers: [DashboadDefaultComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboadDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
