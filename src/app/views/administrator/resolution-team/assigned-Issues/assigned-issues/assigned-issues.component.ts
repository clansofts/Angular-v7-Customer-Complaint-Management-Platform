import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeDialogComponent } from './compose-dialog/compose-dialog.component';
import { AdminComponent } from '../../../admin.component';
import { AssignedService, AssignedIssuesModel } from '../../assigned.service';
import { MessagesRTComponent } from '../../ticket-management/messages/messages.component';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { FormBuilder } from '@angular/forms';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { ToastrService } from 'ngx-toastr';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { UserService } from 'src/app/shared/services/user-service.service';
import { distinctUntilChanged, concatAll, filter } from 'rxjs/operators';

@Component({
  selector: 'app-assigned-issues',
  templateUrl: './assigned-issues.component.html',
  styleUrls: ['./assigned-issues.component.scss'],
  animations: [SharedAnimations]
})
export class AssignedIssuesComponent extends MessagesRTComponent implements OnInit, AfterContentInit {
  mails$: Observable<any>;
  selected: any;
  Count: any = {};
  myassignedIssues$: any;

  constructor(
    public admin: AdminComponent,
    public modalService: NgbModal,
    public toastr: ToastrService,
    public assignedService: AssignedService,
    public utilityService: UtilitiesService,
    public fb: FormBuilder,
    public localStorageService: LocalStoreService,
    private userService: UserService

  ) {
    super(admin, modalService, toastr, assignedService,
      utilityService, fb, localStorageService
    );
    admin.currentUserRole();
  }

  async ngOnInit() {
    Promise.all([
      // Fetch assigned issued
      await this.assignedService.initAssignments(),

      // Get all issues assigned to a user
      this.myAssignedIssues()
    ]).catch((error) => {
      console.error(error);
    });
  }

  ngAfterContentInit() {
  }

  select(i) {
    console.log(i);
  }

  async filterByAssignedToMe(id: number) {
    try {
      const values = [];
      const Assigned = await this.assignedService.assignments$.pipe(
        distinctUntilChanged(),
        concatAll(),
        filter((issue?: AssignedIssuesModel) => {
          return (issue.assignedTo !== null);
        }),
        filter((issue?: AssignedIssuesModel) => {
          return (issue.assignedTo === id);
        }),
      );
      Assigned.pipe()
        .subscribe(val => {
          values.push(val);
        }, err => {
          throw err;
        });
      this.myassignedIssues$ = values;
      return;
    } catch (err) {
      console.error(err);
    }
  }

  // Get all issues assigned to a user
  async myAssignedIssues(): Promise<void> {
    try {
      const userId: number = this.userService.currentUserID;
      if (userId) {
        await this.filterByAssignedToMe(userId);
        // Count number of items to display
        this.addCount(8, this.myassignedIssues$);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }

}
