import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeDialogComponent } from '../compose-dialog/compose-dialog.component';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { IssuesResolutionService, Roles } from '../../issues.service';
import { ComplaintsModel } from 'src/app/views/customer/customer-complaints/complaints.service';
import { distinctUntilChanged, filter, concatAll, timeout, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { AdminComponent } from '../../../admin.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [SharedAnimations]
})
export class MessagesComponent implements OnInit, AfterContentInit {
  Issues$: any;
  selected: any;
  issuesAssignmentform: FormGroup;
  loading: boolean;
  confirmResut: string;
  Roles: Roles;
  Active: number;
  Count: any = {};

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

  constructor(
    private modalService: NgbModal,
    private issuesService: IssuesResolutionService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private errorService: ErrorDialogService,
    private admin: AdminComponent
  ) {
    this.admin.currentUserRole();
  }

  ngOnInit() {
    Promise.all([
      this.buildForm(),
      // Initialize the issues service
      this.issuesService.initIssues(),
      // store all issues in Issues$ variable
      this.allIssues(),
      this.fetchRoles(),
      this.issuesService.resolved
    ])
      .then(function () {
        console.log('application loaded successfully');
      }).catch(function () {
        console.log('An error occured while fetching resources');
      });
  }

  // Component lifecycle management
  ngAfterContentInit() {

  }

  select(issue: any) {
    console.log(issue);
    this.selected = issue;
    this.issuesAssignmentform.controls.issueId.setValue(issue.issueid);
  }

  // For styling the selected element
  set setActive(val: number) {
    this.Active = val;
  }

  /* Have to create two form controls for both form */
  buildForm() {
    this.issuesAssignmentform = this.fb.group({
      roles: ['', [Validators.required]],
      comment: [],
      issueId: ['', [Validators.required]]
    });
  }

  fetchRoles() {
    this.issuesService.roles.toPromise()
      .then(res => {
        this.Roles = res;
      }).then(() => {
        this.issuesAssignmentform.controls.roles.setValue(this.Roles[0]);
      });
  }

  submit() {
    const form = this.issuesAssignmentform.value;
    this.assignButton.loading = true;
    setTimeout(() => {
      this.issuesService.assignIssue(form)
        .toPromise()
        .then(async (res: any) => {
          this.assignButton.loading = false;
          if (res) {
            await this.toastr.success(`Assigned to ${this.issuesAssignmentform.value.roles.description}
             team.`, 'Success!');
            this.ngOnInit();
            this.modalService.dismissAll();
            return;
          }
          // Warning
          this.toastr.error('An error occured while submiting', 'Error!', { closeButton: true });
        }, error => {
          this.toastr.error(error, 'Error!', { closeButton: true });
        });
    }, 3000);
  }

  // get issues from observable
  async allIssues() {
    this.setActive = 0;
    await this.issuesService.issues$
      .pipe(distinctUntilChanged())
      .subscribe((result: ComplaintsModel) => {
        if (result) {
          this.Issues$ = result;
          // Total number of issues
          this.Count.all = this.Issues$.length;
          // Filter by type
          this.Filter();
        }
      }, error => {
        this.toastr.error(error, 'An error occured while fetching issues', { closeButton: true });
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

  // Get resolved issues for review
  fetchResolvedIssues() {
    this.issuesService.fetchResolved().toPromise()
      .then((response: ComplaintsModel) => {
        console.log(response);
        this.Issues$ = response;
      });
  }

  showLoading(btn: { loading: boolean; }) {
    btn.loading = true;
    setTimeout(() => {
      btn.loading = false;
      this.toastr.success(`Issue Updated`);
    }, 3000);
  }

  // Filter by status
  async filterBy(code?: number) {
    this.setActive = code;
    const values = [];
    const inProgress = await this.issuesService.issues$
      .pipe(
        distinctUntilChanged(),
        concatAll(),
        filter((issue?: ComplaintsModel) => {
          return (issue.status !== null);
        }),
        filter((issue?: ComplaintsModel) => {
          return (issue.status.stId === code);
        }),
      );
    await inProgress.pipe().subscribe(val => {
      values.push(val);
    });
    this.Issues$ = values;
    // Count number of items to display
    this.addCount(code, this.Issues$);
  }

  // Filter automatically
  Filter() {
    const self = this;
    const types = [1, 2, 3, 4, 5, 6];
    types.forEach(function (value) {
      self.filterBy(value);
    });
    // Default
    this.filterBy(1);
  }

  addCount(code: any, arr: { length: any; }) {
    const length = arr.length;
    switch (code) {
      case 1:
        return this.Count.open = length;
      case 2:
        return this.Count.assigned = length;
      case 3:
        return this.Count.closed = length;
      case 4:
        return this.Count.progress = length;
      case 5:
        return this.Count.resolved = length;
      case 6:
        return this.Count.rejected = length;
    }
  }

  // Close an issue
  closeIssue() {
    try {
      this.issuesService.closeIssue(this.selected.issueid)
        .subscribe(res => console.log(res));
      this.selected = null;
    } catch (err) {
      console.log(err);
    }
  }

  reAssignIssue() {
    const form = this.issuesAssignmentform.value;
    this.assignButton.loading = true;
    setTimeout(() => {
      this.issuesService.resolvedIssues$.subscribe(async response => {
        const resolvedIssues = response;
        const selectedIssue = this.selected;
        // Check if the 'selected issueId' exist in 'resolved issues array'
        for (const i in resolvedIssues) {
          if ((this.selected) && (resolvedIssues[i].issues.issueId === selectedIssue.issueid)) {
            await this.issuesService.reassignIssue(resolvedIssues[i], form)
              .toPromise().then((resp: any) => {
                this.assignButton.loading = false;
                this.toastr.success(`Re-Assigned to ${this.issuesAssignmentform.value.roles.description}
             team.`, 'Success!');
                this.ngOnInit();
                this.modalService.dismissAll();
              }, error => {
                this.toastr.error(error, 'Error!', { closeButton: true });
              });
            return;
          }
        }
      });
    }, 3000);
  }

  test() {
    this.reAssignIssue();
  }

}
