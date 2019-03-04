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
import { Validators, FormBuilder } from '@angular/forms';

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
  Active: number;
  comment: string; // RC comment
  Assignmentform: any;

  assignButton =
    {
      name: 'primary',
      loading: false,
    };
  updateButton = [
    {
      name: 'primary',
      loading: false,
    },
  ];

  Members = [{
    name: 'Ayoola',
    id: 1
  },
  {
    name: 'Chris',
    id: 2
  },
  {
    name: 'Zim',
    id: 3
  }]

  constructor(
    private admin: AdminComponent,
    private dl: DataLayerService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private errorService: ErrorDialogService,
    private assignedService: AssignedService,
    private fb: FormBuilder,
  ) {
    this.admin.currentUserRole();
  }

  ngOnInit() {
    this.mails$ = this.dl.getMails();
    // Init the form
    this.buildFormBasic();

    // Fetch assigned issued
    this.assignedService.initAssignments();

    // store all issues in assignedIssues$ variable
    this.allIssues();
  }

  select(i: { issue: any; comment: string; }) {
    this.selected = i.issue;
    this.comment = i.comment;
  }

  // For styling the selected element
  set setActive(val: number) {
    this.Active = val;
  }

  buildFormBasic() {
    this.Assignmentform = this.fb.group({
      roles: ['', [Validators.required]],
      comment: [],
      issueId: ['', [Validators.required]]
    });
  }

  openComposeModal() {
    this.modalService.open(ComposeDialogComponent, { size: 'lg', centered: true });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result);
      }, (reason) => {
        console.log('Err!', reason);
      });
  }

  confirm(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.confirmResut = `Closed with: ${result}`;
      }, (reason) => {
        this.confirmResut = `Dismissed with: ${reason}`;
      });
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

  // Filter by
  async filterBy(code: number) {
    console.log(code);
  }

  assignIssue(person) {
    this.toastr.success(`Issue Assigned To ${person}`, 'Assigned!', { closeButton: true });
  }

  reject() {
    this.toastr.warning(`Issue Rejected`, 'Rejected!', { closeButton: true });
  }

  test() {
    console.log(this.assignedIssues$);
  }

}
