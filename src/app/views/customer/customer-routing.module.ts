import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboadDefaultComponent } from './customer-complaints/dashboad-default.component';
import { IssuesTrackingComponent } from './customer-issue-tracking/issues.component';
import { AtmDispenseErrorComponent } from './customer-complaints/atm-dispense-error/atm-dispense-error.component';
import { CardIssueComponent } from './customer-complaints/card-issue/card-issue.component';
import { EChannelsErrorComponent } from './customer-complaints/e-channels-error/e-channels-error.component';
import { ServiceIssueComponent } from './customer-complaints/service-issue/service-issue.component';

const routes: Routes = [
  {
    path: 'v1',
    component: DashboadDefaultComponent,
    children: [
      {
        path: '',
        component: AtmDispenseErrorComponent
      },
      {
        path: 'atm-dispense-error',
        component: AtmDispenseErrorComponent
      },
      {
        path: 'card-issue',
        component: CardIssueComponent
      },
      {
        path: 'e-channels-error',
        component: EChannelsErrorComponent
      },
      {
        path: 'service-issue',
        component: ServiceIssueComponent
      },
    ]
  },
  {
    path: 'v2',
    component: IssuesTrackingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
