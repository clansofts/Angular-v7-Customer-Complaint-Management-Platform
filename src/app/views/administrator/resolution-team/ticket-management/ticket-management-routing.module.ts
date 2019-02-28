import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesRTComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesRTComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsManagementRoutingModule { }
