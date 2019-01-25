import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboadDefaultComponent } from './dashboad-customer-complaints/dashboad-default.component';
import { DashboardV2Component } from './dashboard-customer-issue-tracking/dashboard-v2.component';
import { AtmDispenseErrorComponent } from './dashboad-customer-complaints/atm-dispense-error/atm-dispense-error.component';
import { CardIssueComponent } from './dashboad-customer-complaints/card-issue/card-issue.component';
import { EChannelsErrorComponent } from './dashboad-customer-complaints/e-channels-error/e-channels-error.component';
import { ServiceIssueComponent } from './dashboad-customer-complaints/service-issue/service-issue.component';

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
    component: DashboardV2Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
