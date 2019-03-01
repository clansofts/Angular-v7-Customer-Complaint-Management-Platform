import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../../admin.component';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ComposeDialogComponent } from '../compose-dialog/compose-dialog.component';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { ToastrService } from 'ngx-toastr';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { AssignedService, AssignedIssuesModel } from '../../assigned.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [SharedAnimations]
})
export class MessagesRTComponent implements OnInit {
  mails$: Observable<any>;
  selected: any;
  assignedIssues$: any;
  loading: boolean;
  confirmResut: string;

  constructor(
    private admin: AdminComponent,
    private dl: DataLayerService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private errorService: ErrorDialogService,
    private assignedService: AssignedService
  ) {
    this.admin.currentUserRole();
  }

  ngOnInit() {
    this.mails$ = this.dl.getMails();

    // Fetch assigned issued
    this.assignedService.initAssignments();

    // store all issues in assignedIssues$ variable
    this.allIssues();
  }

  select(i) {
    console.log(i);
    this.selected = i.issue;
  }

  openComposeModal() {
    this.modalService.open(ComposeDialogComponent, { size: 'lg', centered: true });
  }

  // get issues from observable
  async allIssues() {
    // this.setActive = 0;
    await this.assignedService.assignments$
      .pipe(distinctUntilChanged())
      .subscribe((res: AssignedIssuesModel) => {
        this.assignedIssues$ = res;
      });
  }

  test() {
    console.log(this.assignedIssues$);
  }

}
