import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardResolutionChampionComponent } from './resolution-champion/complaints-dashboard/dashboard-resolution-champion.component';
import { MessageComponent } from './resolution-champion/message/message.component';
const routes: Routes = [
  {
    path: 'v1', // RC Dashboard
    component: DashboardResolutionChampionComponent,
  },
  {
    path: 'v2', // Open tickets
    loadChildren: './resolution-champion/open-tickets/tickets.module#TicketsModule',
  },
  {
    path: 'v3', // Messages
    component: MessageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
