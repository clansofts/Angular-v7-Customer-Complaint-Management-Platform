import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminComponent } from '../../../admin.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { ToastrService } from 'ngx-toastr';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { AssignedService, AssignedIssuesModel, Teams } from '../../assigned.service';
import { distinctUntilChanged, concatAll, filter, delay, debounceTime, takeUntil } from 'rxjs/operators';
import { Validators, FormBuilder } from '@angular/forms';
import { Emoji } from './Emoji';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { from, Subject } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [SharedAnimations]
})
export class MessagesRTComponent implements OnInit, OnDestroy {
  selected: any = {};
  assignedIssues$: any;
  loading: boolean;
  confirmResut: string;
  Active: number;
  comment: string; // RC comment
  Assignmentform: any;
  teams: Teams;
  Count: any = {};

  //
  private unsubscription$ = new Subject<void>();

  // Model for Actions taken
  actionsModel: any = {};

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
    public admin: AdminComponent,
    public modalService: NgbModal,
    public toastr: ToastrService,
    public assignedService: AssignedService,
    public utilityService: UtilitiesService,
    public fb: FormBuilder,
    public localStorageService: LocalStoreService
  ) {
    this.admin.currentUserRole();
  }

  async ngOnInit() {
    // Init the form
    this.createAssignmentForm();

    // Fetch assigned issued
    await this.assignedService.initAssignments();

    // store all issues in assignedIssues$ variable
    await this.fetchIssues();

    // get the resolution team members
    this.fetchTeamMembers();

    // Set selected issue to null
    this.selected = null;

    // Watch for search
    this.handleSearchFilter();
  }

  ngOnDestroy(): void {
    this.unsubscription$.next();
    this.unsubscription$.complete();
  }

  // get issues from observable
  async fetchIssues() {
    await this.assignedService.assignments$
      .pipe(distinctUntilChanged(),
        takeUntil(this.unsubscription$))
      .subscribe((res?: AssignedIssuesModel) => {
        if (res) {
          this.assignedIssues$ = res;
          // Dynamic sorting
          this.utilityService.sortBy(this.assignedIssues$, 'created_On', -1);
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
      await inProgress.pipe(takeUntil(this.unsubscription$))
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

  // Filter automatically on init
  Filter(): void {
    try {
      const self = this;
      const types = [2, 7, 4, 3];
      types.forEach(function (value) {
        self.filterBy(value);
      });
      // Default
      this.filterByAssigned(8);
      this.filterBy(2);
    } catch (err) {

    }
  }

  // Get current user from local storage
  get currentUser() {
    const user: any = this.localStorageService.getItem('currentUser');
    if (user) {
      return user;
    }
  }

  // Filter by the assigned user
  async filterByAssigned(x: number) {
    try {
      this.setActive = x;
      const code = this.currentUser;
      const values = [];
      const inProgress = await this.assignedService.assignments$
        .pipe(
          distinctUntilChanged(),
          concatAll(),
          filter((issue?: AssignedIssuesModel) => {
            return (issue.assignedTo !== null);
          }),
          filter((issue?: AssignedIssuesModel) => {
            return (issue.assignedTo === code.MemberId);
          }),
        );
      await inProgress.pipe(takeUntil(this.unsubscription$))
        .subscribe(val => {
          values.push(val);
        }, err => {
          throw err;
        });
      this.assignedIssues$ = values;
      // Count number of items to display
      this.addCount(x, this.assignedIssues$);
    } catch (err) {
      // Handle exception
      console.log(err);
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
        case 3:
          return this.Count.completed = length;
        case 8:
          return this.Count.myassigned = length;
      }
    } catch (err) {
      console.error(err);
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

  // Create Reactive Form
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
    this.loading = true;
    const i = this.selected;
    this.assignedService.resolved(i, this.actionsModel)
      .toPromise()
      .then(res => {
        if (res) {
          this.loading = false;
          this.toastr.info(res, 'Info!', { closeButton: true });
          this.modalService.dismissAll();
          this.actionsModel = {};
          this.ngOnInit();
        }
      })
      .catch(error => {
        this.toastr.error(error, 'Error!', { closeButton: true });
        this.loading = false;
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

  // Filter for the term, Currently is case sensitive
  handleSearchFilter() {
    this.utilityService.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.unsubscription$))
      .subscribe((term: string) => {
        // Call external function
        this.sortList(term, this.assignedIssues$);
      }, err => {
        // Call external function
        this.fetchIssues();
        console.error(err);
      });
  }

  // Create filtered list
  sortList(term: string, arr: any) {
    const state = arr;
    const searchresults: any = [];
    try {
      if (!term) {
        return;
      }
      const source = from(arr);
      source.pipe(filter((i: any) => {
        return (i.customer.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
          i.customer.toLowerCase().includes(term));
      }), takeUntil(this.unsubscription$))
        .subscribe((response: any) => {
          if (response) {
            searchresults.push(response);
            // Global variable
            this.assignedIssues$ = searchresults;
          }
        }, err => {
          console.error(err);
          // Global variable
          this.assignedIssues$ = state;
        });
    } catch (error) {
      console.error(error);
      // Global variable
      this.assignedIssues$ = state;
    }
  }

  test(value) {
    console.log(value);
  }

}
