import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeDialogComponent } from '../compose-dialog/compose-dialog.component';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { IssuesResolutionService, Roles, Assign } from '../../issues.service';
import { ComplaintsModel } from 'src/app/views/customer/customer-complaints/complaints.service';
import { distinctUntilChanged, filter, concatAll, timeout, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { AdminComponent } from '../../../admin.component';
import { AssignedService, AssignedIssuesModel } from '../../../resolution-team/assigned.service';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

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
  comment: string;

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
    private admin: AdminComponent,
    private assignedService: AssignedService,
    private utilityService: UtilitiesService
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
    this.selected = null;
  }

  // Component lifecycle management
  ngAfterContentInit() {
    try {
      this.assignedService.initAssignments();
    } catch (error) {
      console.error(error);
    }
  }

  select(issue: any) {
    try {
      this.selected = issue;
      this.issuesAssignmentform.controls.issueId.setValue(issue.issueid);
      // Get comment from selectedIssue by checking the assigned table if comment exist
      this.AssignedIssuesTable(this.selected.issueid);
    } catch (err) {

    }
  }

  // Function to get comment from selectedIssue from the assigned issues table
  AssignedIssuesTable(id: number): void {
    this.comment = null;
    this.assignedService.assignments$
      .pipe(
        concatAll(),
        filter((item?: any) => {
          return (item.issue.issueId === id);
        }))
      .subscribe((response: any) => {
        return this.Comment = (response.comment);
      }, err => {
        console.log(err);
      })
  }

  // Set Comment
  set Comment(comment: any) {
    if (comment) this.comment = comment;
  }

  // For styling the selected element
  set setActive(val: number) {
    this.Active = val;
    this.selected = null;
  }

  /* Build the reactive form */
  buildForm() {
    this.issuesAssignmentform = this.fb.group({
      roles: ['', [Validators.required]],
      comment: [],
      issueId: ['', [Validators.required]]
    });
  }

  // Fetch the available roles for the resolution teams
  fetchRoles() {
    this.issuesService.roles.toPromise()
      .then((res: Roles) => {
        this.Roles = res;
      }).then(() => {
        this.issuesAssignmentform.controls.roles.setValue(this.Roles[0]); // DevOps by default
      }).catch((err) => {
        console.log(err);
      });
  }

  submit() {
    const form = this.issuesAssignmentform.value;
    try {
      this.assignButton.loading = true;
      this.issuesService.assignIssue(form)
        .toPromise()
        .then(async (res: Assign) => {
          this.assignButton.loading = false;
          await this.toastr.success(`Assigned to ${this.issuesAssignmentform.value.roles.description}
             team.`, 'Success!');
          this.ngOnInit();
          this.modalService.dismissAll();
        })
        .catch((error) => {
          this.toastr.error(error, 'Error!', { closeButton: true });
          this.assignButton.loading = false;
        });
    } catch (err) {
      this.assignButton.loading = false;
      console.log(err);
    }
  }

  // get issues from observable
  async allIssues() {
    this.setActive = 0;
    await this.issuesService.issues$
      .pipe(distinctUntilChanged())
      .subscribe((result: ComplaintsModel) => {
        if (result) {
          this.Issues$ = result;
          // Dynamic sorting
          this.utilityService.sortBy(this.Issues$, 'created_On');
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
        this.Issues$ = response;
      }).catch((err) => {
        console.log(err);
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
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  // Filter automatically
  Filter() {
    try {
      const self = this;
      const types = [1, 2, 3, 4, 5, 6];
      types.forEach(function (value) {
        self.filterBy(value);
      });
      // Default
      this.filterBy(1);
    } catch (err) {

    }
  }

  addCount(code: any, arr: { length: any; }) {
    try {
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
    } catch (err) {
      // Handle if error
      console.log(err);
    }
  }

  // Close an issue
  closeIssue() {
    try {
      this.issuesService.closeIssue(this.selected.issueid)
        .toPromise().then(res => {
          this.toastr.success(`${res}`, 'Issue Closed!');
          this.ngOnInit();
        });
      this.selected = null;
    } catch (err) {
      this.toastr.error(err, 'Error!', { closeButton: true });
    }
  }

  // Reassignment method, This works for resolved and rejected issues
  reAssignIssue() {
    const form = this.issuesAssignmentform.value;
    this.assignButton.loading = true;
    setTimeout(() => {
      if (this.selected.status.stId === 6) {
        this.assignedService.assignments$.subscribe(response => {
          const resolvedIssues = response;
          const selectedIssue = this.selected;
          this.reassign(resolvedIssues, selectedIssue, form);
        }, err => {
          // Handle error
          throw err;
        });
        return;
      }
      this.issuesService.resolvedIssues$.subscribe(async response => {
        const resolvedIssues = response;
        const selectedIssue = this.selected;
        // Check if the 'selected issueId' exist in 'resolved issues array'
        this.reassign(resolvedIssues, selectedIssue, form);
      }, err => {
        throw err;
      });
    }, 1000);
  }

  async reassign(arr: any, selected: any, forms: any) {
    try {
      for (const i in arr) {
        if ((this.selected) && (arr[i].issues.issueId === selected.issueid)) {
          await this.issuesService.reassignIssue(arr[i], forms)
            .toPromise()
            .then((resp: any) => {
              this.assignButton.loading = false;
              this.toastr.success(`Re-Assigned to ${this.issuesAssignmentform.value.roles.description}
         team.`, 'Success!');
              this.ngOnInit();
              this.modalService.dismissAll();
            }).catch((err) => {
              // Handle error
              console.log(err);
              this.toastr.error(err, 'Error!', { closeButton: true });
            });
          return;
        }
      }
    } catch (err) {
      throw err;
    }
  }

}
