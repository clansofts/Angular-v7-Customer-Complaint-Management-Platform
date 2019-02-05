import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboadDefaultComponent } from './dashboad-customer-complaints/dashboad-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DashboardV2Component } from './dashboard-customer-issue-tracking/dashboard-v2.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AtmDispenseErrorComponent } from './dashboad-customer-complaints/atm-dispense-error/atm-dispense-error.component';
import { CardIssueComponent } from './dashboad-customer-complaints/card-issue/card-issue.component';
import { EChannelsErrorComponent } from './dashboad-customer-complaints/e-channels-error/e-channels-error.component';
import { ServiceIssueComponent } from './dashboad-customer-complaints/service-issue/service-issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboadDefaultComponent,
    DashboardV2Component,
    AtmDispenseErrorComponent,
    CardIssueComponent,
    EChannelsErrorComponent,
    ServiceIssueComponent
  ]
})
export class DashboardModule { }
