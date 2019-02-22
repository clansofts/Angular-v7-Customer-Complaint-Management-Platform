import { Component, OnInit } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { Observable, interval } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeDialogComponent } from '../compose-dialog/compose-dialog.component';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { IssuesResolutionService, Roles } from '../../issues.service';
import { ComplaintsModel } from 'src/app/views/customer/customer-complaints/complaints.service';
import { map } from 'rxjs/internal/operators/map';
import { distinctUntilChanged, delay } from 'rxjs/operators';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AdminComponent } from '../../../admin.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [SharedAnimations]
})
export class MessagesComponent implements OnInit {
  Issues$: ComplaintsModel;
  selected: any;
  issuesAssignmentform: FormGroup;
  loading: boolean;
  confirmResut: string;
  Roles: Roles;
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
    await this.issuesService.issues$
      .pipe(distinctUntilChanged())
      .subscribe((res: ComplaintsModel) => {
        this.Issues$ = res;
      });
  }

  openComposeModal() {
    this.modalService.open(ComposeDialogComponent, { size: 'lg', centered: true });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result);
      }, (reason) => {
        console.log('Err!', reason);
      });
  }

  confirm(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.confirmResut = `Closed with: ${result}`;
      }, (reason) => {
        this.confirmResut = `Dismissed with: ${reason}`;
      });
  }

  get numTickets() {
    return;

  }

  showLoading(btn) {
    btn.loading = true;
    setTimeout(() => {
      btn.loading = false;
      this.toastr.success(`Issue Updated`);
    }, 3000);
  }

  test() {
    console.log('Running test');
    console.log('SAMA');
  }

}
