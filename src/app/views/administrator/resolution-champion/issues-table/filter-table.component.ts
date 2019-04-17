import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, concatAll } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { AdminComponent } from '../../admin.component';
import { AssignedService } from '../../resolution-team/assigned.service';
import { IssuesResolutionService } from '../issues.service';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class IssuesTableComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl();

  // Table resources
  Issues: any;
  private filteredIssues$: any;

  private unsubscription$ = new Subject<void>();

  constructor(
    public assignedService: AssignedService,
    private adminService: AdminComponent,
    private issuesService: IssuesResolutionService,
  ) {
    this.adminService.currentUserRole();
  }

  async ngOnInit() {
    Promise.all([
      // Fetch assigned issued
      await this.issuesService.initIssues(),
      this.loadTable(),
      this.searchTable()
    ]);
  }

  ngOnDestroy(): void {
    this.unsubscription$.next();
    this.unsubscription$.complete();
  }

  // Initialize the table
  async loadTable() {
    const results = [];
    await this.issuesService.issues$
      .pipe(
        concatAll(),
        distinctUntilChanged(),
        map((response: any) => {
          return {
            'firstname': response.firstName,
            'lastname': response.lastName,
            'account_number': response.accountnumber,
            'category': response.category,
            'email': response.email,
            'source': response.source,
            'status': response.status.name,
            'issueId': response.issueid,
            'datecreated': response.created_On
          };
        }))
      .subscribe((res?: any) => {
        results.push(res);
        this.Issues = results;
        this.filteredIssues$ = results;
      },
        error => {
          console.log(error);
        });
  }

  // Searches by filtering
  searchTable() {
    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.filerData(value);
      });
  }

  // Filter
  filerData(val: string) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredIssues$ = this.Issues;
    }

    const columns = Object.keys(this.Issues[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.Issues.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredIssues$ = rows;
  }

  test() {
  }

}
