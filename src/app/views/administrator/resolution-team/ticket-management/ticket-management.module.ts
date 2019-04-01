import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposeDialogComponent } from './compose-dialog/compose-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { LaddaModule } from 'angular2-ladda';
import { TicketsManagementRoutingModule } from './ticket-management-routing.module';
import { MessagesRTComponent } from './messages/messages.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
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
    TagInputModule
  ],
  declarations: [MessagesRTComponent, ComposeDialogComponent],
  entryComponents: [ComposeDialogComponent]
})
export class TicketManagementModule { }
