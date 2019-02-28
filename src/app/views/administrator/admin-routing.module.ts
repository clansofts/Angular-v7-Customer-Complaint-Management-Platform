import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardResolutionChampionComponent } from './resolution-champion/complaints-dashboard/dashboard-resolution-champion.component';
import { MessageComponent } from './resolution-champion/message/message.component';
import { AdminComponent } from './admin.component';
import { TeamDashboardComponent } from './resolution-team/team-dashboard/team-dashboard.component';
import { MessageRTComponent } from './resolution-team/message/message.component';
// Resolution Champion
const routes: Routes = [
  {
    path: 'complaints-dashboard', // RC Dashboard
    component: DashboardResolutionChampionComponent,
  },
  {
    path: 'opentickets', // Open tickets
    loadChildren: './resolution-champion/open-tickets/tickets.module#TicketsModule',
  },
  {
    path: 'messages', // Messages
    component: MessageComponent
  },
];

const routes_rt: Routes = [
  {
    path: 'team-dashboard', // RT Dashboard
    component: TeamDashboardComponent,
  },
  {
    path: 'ticket-resolution', // Assigned tickets
    loadChildren: './resolution-team/ticket-management/ticket-management.module#TicketManagementModule',
  },
  {
    path: 'complaint-messages', // Messages
    component: MessageRTComponent
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forChild(routes_rt)],
  exports: [RouterModule],
  providers: [
    AdminComponent
  ],
})
export class AdminRoutingModule { }
