import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { DashboadDefaultComponent } from './customer-complaints/dashboad-default.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { IssuesTrackingComponent } from './customer-issue-tracking/issues.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AtmDispenseErrorComponent } from './customer-complaints/atm-dispense-error/atm-dispense-error.component';
import { CardIssueComponent } from './customer-complaints/card-issue/card-issue.component';
import { EChannelsErrorComponent } from './customer-complaints/e-channels-error/e-channels-error.component';
import { ServiceIssueComponent } from './customer-complaints/service-issue/service-issue.component';
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
    CustomerRoutingModule,
  ],
  declarations: [
    DashboadDefaultComponent,
    IssuesTrackingComponent,
    AtmDispenseErrorComponent,
    CardIssueComponent,
    EChannelsErrorComponent,
    ServiceIssueComponent
  ]
})
export class CustomerModule { }
