import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TicketsRoutingModule } from './tickets-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { ComposeDialogComponent } from './compose-dialog/compose-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { LaddaModule } from 'angular2-ladda';

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
    TicketsRoutingModule,
    LaddaModule.forRoot({ style: 'expand-left'}),
  ],
  declarations: [MessagesComponent, ComposeDialogComponent],
  entryComponents: [ComposeDialogComponent]
})
export class TicketsModule { }
