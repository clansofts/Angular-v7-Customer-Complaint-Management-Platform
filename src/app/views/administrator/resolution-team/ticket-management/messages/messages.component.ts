import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../../admin.component';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { ToastrService } from 'ngx-toastr';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { AssignedService, AssignedIssuesModel, Teams } from '../../assigned.service';
import { distinctUntilChanged, catchError, concatAll, filter, delay } from 'rxjs/operators';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Emoji } from './Emoji';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [SharedAnimations]
})
export class MessagesRTComponent implements OnInit {
  mails$: Observable<any>;
  selected: any = {};
  assignedIssues$: any;
  loading: boolean;
  confirmResut: string;
  Active: number;
  comment: string; // RC comment
  Assignmentform: any;
  teams: Teams;
  Count: any = {};

  autocompletes$: Observable<any[]>;
  tagsCtrl2 = new FormControl([{ display: 'Test', value: 'BD' }]);


  @Emoji()
  flavor = 'valhala';

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
    private admin: AdminComponent,
    private dl: DataLayerService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private assignedService: AssignedService,
    private utilityService: UtilitiesService,
    private fb: FormBuilder,
  ) {
    this.admin.currentUserRole();
    this.autocompletes$ = this.dl.getIssuesTagDemo();
  }

  async ngOnInit() {
    this.mails$ = this.dl.getMails();
    // Init the form
    this.createAssignmentForm();

    // Fetch assigned issued
    this.assignedService.initAssignments();

    // store all issues in assignedIssues$ variable
    this.fetchIssues();

    // get the resolution team members
    this.fetchTeamMembers();

    this.selected = null;
  }

  // get issues from observable
  async fetchIssues() {
    await this.assignedService.assignments$
      .pipe(distinctUntilChanged())
      .subscribe((res?: AssignedIssuesModel) => {
        if (res) {
          this.assignedIssues$ = res;
          // Dynamic sorting
          this.utilityService.sortBy(this.assignedIssues$, 'created_On');
          delay(1000);
          this.Filter();
        }
      }, error => {
        throw (error);
      });
  }

  // Fetch list of team members
  fetchTeamMembers(): void {
    this.assignedService.teams.toPromise()
      .then((result: Teams) => {
        this.teams = result;
      })
      .catch(err => {
        throw err;
      });
  }

  // Submit the issue to the backend
  assignIssue() {
    this.assignButton.loading = true;
    const person = this.Assignmentform.value.teamId.name;
    setTimeout(() => {
      this.assignedService.assignTo(this.Assignmentform.value)
        .toPromise()
        .then((res) => {
          this.assignButton.loading = false;
          this.toastr.success(`Issue Assigned To ${person}`, 'Assigned!', { closeButton: true });
          delay(1000);
          this.modalService.dismissAll();
          // Refresh the observable
          this.assignedService.initAssignments();
        })
        .catch(error => {
          this.toastr.error(error, 'Error Occured!', { closeButton: true });
          this.assignButton.loading = false;
        });
    }, 500);
  }

  async filterBy(code: number) {
    try {
      this.setActive = code;
      const values = [];
      const inProgress = await this.assignedService.assignments$
        .pipe(
          distinctUntilChanged(),
          concatAll(),
          filter((issue?: AssignedIssuesModel) => {
            return (issue.status !== null);
          }),
          filter((issue?: AssignedIssuesModel) => {
            return (issue.status.stId === code);
          }),
        );
      await inProgress.pipe()
        .subscribe(val => {
          values.push(val);
        }, err => {
          throw err;
        });
      this.assignedIssues$ = values;
      // Count number of items to display
      this.addCount(code, this.assignedIssues$);
    } catch (err) {
      // Handle exception
      console.log(err);
    }
  }

  // Filter automatically
  Filter() {
    try {
      const self = this;
      const types = [2, 7, 4];
      types.forEach(function (value) {
        self.filterBy(value);
      });
      // Default
      this.filterBy(2);
    } catch (err) {

    }
  }

  // Filter the respective Counts
  addCount(code: any, arr: { length: any; }) {
    try {
      const length = arr.length;
      switch (code) {
        case 2:
          return this.Count.pending = length;
        case 7:
          return this.Count.reassigned = length;
        case 4:
          return this.Count.progress = length;
      }
    } catch (err) {
      throw err;
    }
  }

  // For selected issue
  select(i: { issue: any; issueId: any; comment: string; id: any; }) {
    this.selected = i.issue;
    this.selected.id = i.id;
    this.comment = i.comment;
    this.Assignmentform.setValue({
      comment: '',
      assignId: i.id,
      teamId: ''
    });
  }

  // For styling the selected element
  set setActive(val: number) {
    try {
      this.Active = val;
      this.selected = null;
    } catch (err) {
      throw err;
    }
  }

  // Create Reacgtive Form
  createAssignmentForm() {
    this.Assignmentform = this.fb.group({
      assignId: ['', [Validators.required]],
      comment: '',
      teamId: ['', [Validators.required]] // team id
    });
  }

  // Open the modal to accept an issue and assign a team memmber
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Open the modal to reject an issue
  confirm(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.confirmResut = `Closed with: ${result}`;
      }, (reason) => {
        this.confirmResut = `Dismissed with: ${reason}`;
      });
  }

  // When rt-user rejects an issue, change the status to rejected
  reject(comment: string) {
    setTimeout(() => {
      try {
        this.assignedService.reject(this.selected.id, comment).toPromise().then(res => {
          this.toastr.success(`${res}`, 'Issue Rejected!');
          this.ngOnInit();
        });
        this.selected = null;
      } catch (err) {
        this.toastr.error(err, 'Error!', { closeButton: true });
      }
    }, 500);
  }

  // Mark an issue as resolved
  isResolved() {
    this.assignedService.resolved(this.selected.id)
      .toPromise()
      .then(res => {
        if (res) {
          this.toastr.info(res, 'Info!', { closeButton: true });
          this.ngOnInit();
        }
      })
      .catch(error => {
        this.toastr.error(error, 'Error!', { closeButton: true });
      });
  }

  openlarge(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result);
      }, (reason) => {
        console.log('Err!', reason);
      });
  }

  public onSelect(item: string) {
    console.log('tag selected: value is ' + item);
  }

}
