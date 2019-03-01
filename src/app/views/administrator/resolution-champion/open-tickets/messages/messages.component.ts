import { Component, OnInit } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeDialogComponent } from '../compose-dialog/compose-dialog.component';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { IssuesResolutionService, Roles } from '../../issues.service';
import { ComplaintsModel } from 'src/app/views/customer/customer-complaints/complaints.service';
import { distinctUntilChanged, delay, filter, concatAll } from 'rxjs/operators';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { AdminComponent } from '../../../admin.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [SharedAnimations]
})
export class MessagesComponent implements OnInit {
  Issues$: any;
  selected: any;
  issuesAssignmentform: FormGroup;
  loading: boolean;
  confirmResut: string;
  Roles: Roles;
  Active: number;

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
    // Initialize the issues service
    this.issuesService.initIssues();
    // store all issues in Issues$ variable
    this.allIssues();
    this.fetchRoles();
    this.buildFormBasic();
  }

  select(issue: any) {
    this.selected = issue;
    this.issuesAssignmentform.controls.issueId.setValue(issue.issueId);
  }

  // For styling the selected element
  set setActive(val: number) {
    this.Active = val;
  }

  /* Have to create two form controls for both form */
  buildFormBasic() {
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
        .then((res: any) => {
          this.assignButton.loading = false;
          if (res) {
            this.toastr.success(`Assigned to ${this.issuesAssignmentform.value.roles.description}
             team.`, 'Success!');
            delay(1000);
            this.ngOnInit();
            return;
          }
          // Error
          this.toastr.error('An error occured while submiting', 'Error!', { closeButton: true });
        });
    }, 3000);
  }

  // get issues from observable
  async allIssues() {
    this.setActive = 0;
    await this.issuesService.issues$
      .pipe(distinctUntilChanged())
      .subscribe((res: ComplaintsModel) => {
        this.Issues$ = res;
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

  fetchResolvedIssues() {
    this.setActive = (5);
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
  async filterBy(code: number) {
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
          return (issue.status.id === code);
        }),
      );
    await inProgress.pipe().subscribe(val => {
      values.push(val);
    });
    this.Issues$ = values;
    console.log(this.Issues$)
  }

  // Close an issue
  closeIssue() {
    console.log(this.selected.issueId);
    try {
      this.issuesService.closeIssue(this.selected.issueId).subscribe(res => console.log(res));
      this.selected = null;
    } catch (err) {
      console.log(err);
    }
  }

  async test() {
    console.log('Running test');
  }

}
