import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DashboardV2Component } from './dashboard-v2/dashboard-v2.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AtmDispenseErrorComponent } from './dashboad-default/atm-dispense-error/atm-dispense-error.component';
import { CardIssueComponent } from './dashboad-default/card-issue/card-issue.component';
import { EChannelsErrorComponent } from './dashboad-default/e-channels-error/e-channels-error.component';
import { ServiceIssueComponent } from './dashboad-default/service-issue/service-issue.component';
import { ComplaintsDashboardRoutingModule } from './dashboad-default/complaints-dashboard-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    DashboardRoutingModule,
    ComplaintsDashboardRoutingModule
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
