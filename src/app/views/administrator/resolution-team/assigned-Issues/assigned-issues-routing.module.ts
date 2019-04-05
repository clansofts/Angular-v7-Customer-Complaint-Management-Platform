import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignedIssuesComponent } from './assigned-issues/assigned-issues.component';

const routes: Routes = [
  {
    path: '',
    component: AssignedIssuesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedIssuesRoutingModule { }
