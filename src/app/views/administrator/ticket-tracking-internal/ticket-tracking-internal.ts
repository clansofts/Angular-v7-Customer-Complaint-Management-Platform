import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InternalTrackingService } from './internal-tracking.service';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { IssuesResolutionService } from '../resolution-champion/issues.service';
import { Subject } from 'rxjs';
import { takeUntil, concatAll, filter } from 'rxjs/operators';
import { AssignedService } from '../resolution-team/assigned.service';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './ticket-tracking-internal.html',
  styleUrls: ['./ticket-tracking-internal.scss'],
  animations: [SharedAnimations]
})
export class TicketTrackingInternalComponent implements OnInit, OnDestroy {
  internalIssuesForm: FormGroup;
  issues: any;

  viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  page = 1;
  pageSize = 8;
  products: any[] = [];
  selected: any;
  ActionsTaken: any;

  // Subscription Object
  private unsubscription$ = new Subject<void>();
  comment: any;

  constructor(
    private adminService: AdminComponent,
    private fb: FormBuilder,
    private issueTrackingService: InternalTrackingService,
    private dl: DataLayerService,
    private issuesService: IssuesResolutionService,
    private assignedService: AssignedService,
  ) {
    this.adminService.currentUserRole();
  }

  ngOnInit() {
    Promise.all([
      this.createSearchForm(),
      // Initialize the issues service
      this.issuesService.initIssues(),
      this.selected = null,
      this.ActionsTaken = null
    ]);
  }

  ngOnDestroy(): void {
    this.unsubscription$.next();
    this.unsubscription$.complete();
  }

  createSearchForm(): void {
    this.internalIssuesForm = this.fb.group({
      issueId: '',
      email: '',
      accountNumber: ''
    });
  }

  submit(form: { value: any; }): void {
    this.selected = null;
    this.ActionsTaken = null;
    this.issueTrackingService.trackIssue(form.value)
      .toPromise()
      .then(response => {
        this.issues = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  selectIssue(i: any): void {
    this.selected = null;
    this.ActionsTaken = null;
    this.selected = i;
    this.fetchLog(this.selected, this.ActionsTaken);
  }

  // Functional function to get selectedIssue from the assigned issues table
  fetchLog(selectedissue: any, _variable: any) {
    this.ActionsTaken = null;
    if (selectedissue && selectedissue.status.stId === 5) {
      try {
        const id: number = selectedissue.issueId;
        return this.issuesService.fetchLog(id)
          .pipe(takeUntil(this.unsubscription$))
          .subscribe((response: any) => {
            return this.ActionsTaken = response;
          }, err => {
            console.log(err);
          }, () => {
            console.log('done');
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  // Set Comment
  set Comment(comment: any) {
    if (comment) { this.comment = comment; }
  }

  test() {
  }
}
