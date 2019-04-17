import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardResolutionChampionComponent } from './resolution-champion/complaints-dashboard/dashboard-resolution-champion.component';
import { MessageComponent } from './resolution-champion/message/message.component';
import { AdminComponent } from './admin.component';
import { TeamDashboardComponent } from './resolution-team/team-dashboard/team-dashboard.component';
import { MessageRTComponent } from './resolution-team/message/message.component';
import { TeamCreationComponent } from './resolution-team/team-management/team-creation/team-creation.component';
import { RemoveUserComponent } from './resolution-team/team-management/remove-user/remove-user.component';
import { AssignedIssuesTableComponent } from './resolution-team/issues-table/filter-table.component';
import { TicketTrackingInternalComponent } from 'src/app/views/administrator/ticket-tracking-internal/ticket-tracking-internal';
import { IssuesTableComponent } from './resolution-champion/issues-table/filter-table.component';

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
    // Issues table
    path: 'rc_issues_table',
    component: IssuesTableComponent
  },
  {
    // Issues Table
    path: 'issues_Table',
    loadChildren: ''
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
    component: TeamDashboardComponent
  },
  {
    // Assigned tickets
    path: 'ticket-resolution',
    loadChildren: './resolution-team/ticket-management/ticket-management.module#TicketManagementModule',
  },
  {
    // Assigned tickets
    path: 'my-issues',
    loadChildren: './resolution-team/assigned-Issues/assigned-issues.module#AssignedIssuesModule',
  },
  {
    // Issues table
    path: 'issues_table',
    component: AssignedIssuesTableComponent
  },
  // Issues tracking
  {
    path: 'issue_tracking_internal',
    component: TicketTrackingInternalComponent
  },
  {
    // Messages
    path: 'complaint-messages',
    component: MessageRTComponent
  },
  {
    // Team Management
    path: 'add-user',
    component: TeamCreationComponent
  },
  {
    // Team Management
    path: 'remove-user',
    component: RemoveUserComponent
  },
  {
    // Profle Management
    path: 'user-profile',
    loadChildren: '../pages/pages.module#PagesModule'
  }
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
