import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminComponent } from '../../../admin.component';
import { TicketsRoutingModule } from '../../../resolution-champion/open-tickets/tickets-routing.module';
import { MessagesRTComponent } from './messages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { TicketsManagementRoutingModule } from '../ticket-management-routing.module';
import { LaddaModule } from 'angular2-ladda';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MessagesRTComponent', () => {
  let component: MessagesRTComponent;
  let fixture: ComponentFixture<MessagesRTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessagesRTComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule,
        SharedComponentsModule,
        NgbModule,
        PerfectScrollbarModule,
        QuillModule,
        SharedDirectivesModule,
        TicketsManagementRoutingModule,
        LaddaModule.forRoot({ style: 'expand-left' }),
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      providers: [AdminComponent, ToastrService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesRTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
