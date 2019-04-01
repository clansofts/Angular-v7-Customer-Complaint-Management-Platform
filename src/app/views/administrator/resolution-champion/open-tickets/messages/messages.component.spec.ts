import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageComponent } from '../../message/message.component';
import { TeamDashboardComponent } from '../../../resolution-team/team-dashboard/team-dashboard.component';
import { MessageRTComponent } from '../../../resolution-team/message/message.component';
import { TeamCreationComponent } from '../../../resolution-team/team-management/team-creation/team-creation.component';
import { RemoveUserComponent } from '../../../resolution-team/team-management/remove-user/remove-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminRoutingModule } from '../../../admin-routing.module';
import { DashboardResolutionChampionComponent } from '../../complaints-dashboard/dashboard-resolution-champion.component';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketsRoutingModule } from '../tickets-routing.module';
import { AdminComponent } from '../../../admin.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessagesComponent,
      ],
      imports: [
        CommonModule,
        PerfectScrollbarModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        SharedComponentsModule,
        SharedModule,
        RouterTestingModule,
        QuillModule,
        SharedDirectivesModule,
        BrowserAnimationsModule,
        TicketsRoutingModule
      ],
      providers: [ToastrService, AdminComponent],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
