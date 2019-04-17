import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DashboardResolutionChampionComponent } from './resolution-champion/complaints-dashboard/dashboard-resolution-champion.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MessageComponent } from './resolution-champion/message/message.component';
import { AdminComponent } from './admin.component';
import { TeamDashboardComponent } from './resolution-team/team-dashboard/team-dashboard.component';
import { MessageRTComponent } from './resolution-team/message/message.component';
import { TeamCreationComponent } from './resolution-team/team-management/team-creation/team-creation.component';
import { RemoveUserComponent } from './resolution-team/team-management/remove-user/remove-user.component';
import { LaddaModule } from 'angular2-ladda';
import { AssignedIssuesTableComponent } from './resolution-team/issues-table/filter-table.component';
import { TicketTrackingInternalComponent } from './ticket-tracking-internal/ticket-tracking-internal';
import { IssuesTableComponent } from './resolution-champion/issues-table/filter-table.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    SharedComponentsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NgbModule,
    AdminRoutingModule,
    LaddaModule
  ],
  declarations: [
    DashboardResolutionChampionComponent,
    AssignedIssuesTableComponent,
    IssuesTableComponent,
    MessageComponent,
    AdminComponent,
    TeamDashboardComponent,
    MessageRTComponent,
    TeamCreationComponent,
    RemoveUserComponent,
    TicketTrackingInternalComponent
  ]
})
export class AdminModule { }
