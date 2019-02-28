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
import { MessageComponentRC } from "./resolution-team/message/MessageComponentRC";
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
    AdminRoutingModule
  ],
  declarations: [
    DashboardResolutionChampionComponent,
    MessageComponent,
    AdminComponent,
    TeamDashboardComponent,
    MessageComponentRC,
  ]
})
export class AdminModule { }
