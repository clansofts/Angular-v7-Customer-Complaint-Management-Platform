import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { QuillModule } from "ngx-quill";
import { SharedDirectivesModule } from "src/app/shared/directives/shared-directives.module";
import { AssignedIssuesRoutingModule } from "./assigned-issues-routing.module";
import { AssignedIssuesComponent } from "./assigned-issues/assigned-issues.component";
import { ComposeDialogComponent } from "./assigned-issues/compose-dialog/compose-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    PerfectScrollbarModule,
    QuillModule,
    SharedDirectivesModule,
    AssignedIssuesRoutingModule,
  ],
  declarations: [AssignedIssuesComponent, ComposeDialogComponent],
  entryComponents: [ComposeDialogComponent]
})
export class AssignedIssuesModule { }
