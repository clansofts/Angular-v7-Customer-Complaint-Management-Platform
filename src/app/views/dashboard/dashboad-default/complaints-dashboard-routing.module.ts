import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtmDispenseErrorComponent } from './atm-dispense-error/atm-dispense-error.component';
import { CardIssueComponent } from './card-issue/card-issue.component';
import { EChannelsErrorComponent } from './e-channels-error/e-channels-error.component';
import { ServiceIssueComponent } from './service-issue/service-issue.component';


const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintsDashboardRoutingModule { }