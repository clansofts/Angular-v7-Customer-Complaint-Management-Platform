import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardResolutionChampionComponent } from './resolution-champion/complaints-dashboard/dashboard-resolution-champion.component';
import { MessageComponent } from './resolution-champion/message/message.component';
import { OpenTicketsComponent } from './resolution-champion/open-tickets/open-tickets.component';
const routes: Routes = [
  {
    // Dashboard
    path: 'v1',
    component: DashboardResolutionChampionComponent,
  },
  {
    // Open tickets
    path: 'v2',
    component: OpenTicketsComponent
  },
  {
    // Messages
    path: 'v3',
    component: MessageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
