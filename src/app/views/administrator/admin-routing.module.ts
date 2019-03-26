import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardResolutionChampionComponent } from './resolution-champion/complaints-dashboard/dashboard-resolution-champion.component';
import { MessageComponent } from './resolution-champion/message/message.component';
import { AdminComponent } from './admin.component';
import { TeamDashboardComponent } from './resolution-team/team-dashboard/team-dashboard.component';
import { MessageRTComponent } from './resolution-team/message/message.component';
import { TeamCreationComponent } from './resolution-team/team-management/team-creation/team-creation.component';
import { RemoveUserComponent } from './resolution-team/team-management/remove-user/remove-user.component';
// Resolution Champion
const routes: Routes = [
  {
    // Default
    path: '',
    loadChildren: './resolution-champion/open-tickets/tickets.module#TicketsModule',
  },
  {
    // RC Dashboard
    path: 'complaints-dashboard',
    component: DashboardResolutionChampionComponent,
  },
  {
    // Open tickets
    path: 'opentickets',
    loadChildren: './resolution-champion/open-tickets/tickets.module#TicketsModule',
  },
  {
    // Messages
    path: 'messages',
    component: MessageComponent
  },
];

const routes_rt: Routes = [
  {
    // Default
    path: '',
    loadChildren: './resolution-team/ticket-management/ticket-management.module#TicketManagementModule',
  },
  {
    // RT Dashboard
    path: 'team-dashboard',
    component: TeamDashboardComponent,
  },
  {
    // Assigned tickets
    path: 'ticket-resolution',
    loadChildren: './resolution-team/ticket-management/ticket-management.module#TicketManagementModule',
  },
  {
    // Messages
    path: 'complaint-messages',
    component: MessageRTComponent
  },
  {
    // Team Management
    path: 'add-user',
    component: TeamCreationComponent,
  },
  {
    // Team Management
    path: 'remove-user',
    component: RemoveUserComponent,
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
