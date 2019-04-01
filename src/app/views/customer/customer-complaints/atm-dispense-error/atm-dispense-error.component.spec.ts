import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmDispenseErrorComponent } from './atm-dispense-error.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { DashboadDefaultComponent } from '../dashboad-default.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('AtmDispenseErrorComponent', () => {
  let component: AtmDispenseErrorComponent;
  let fixture: ComponentFixture<AtmDispenseErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtmDispenseErrorComponent],
      imports: [
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        RouterTestingModule,
        SharedComponentsModule,
        NgxEchartsModule,
        NgxDatatableModule,
      ],
      providers: [
        ToastrService,
        DashboadDefaultComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmDispenseErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
