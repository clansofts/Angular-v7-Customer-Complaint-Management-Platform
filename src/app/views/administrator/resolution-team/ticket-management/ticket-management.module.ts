import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { ComposeDialogComponent } from './compose-dialog/compose-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessagesComponent, ComposeDialogComponent]
})
export class TicketManagementModule { }
