import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComplaintsModel } from '../../customer/customer-complaints/complaints.service';
import { distinctUntilChanged, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { interval } from 'rxjs';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

export interface Roles {
  roleId: number;
  designation: string;
  team: string;
  role: string;
  description: string;
}

export interface Assign {
  issueId: number;
  roleId: number;
  comment: string;
  response: false;
}

export interface Reassign {
  asId: number;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class IssuesResolutionService {
  private baseURL = environment.API.BaseURL;
  // Observable of issues
  private issuesSource = new BehaviorSubject<ComplaintsModel>(null);
  issues$ = this.issuesSource.asObservable();
  // Observable of resolved isssues
  private resolvedIssuesSource = new BehaviorSubject<ComplaintsModel>(null);
  resolvedIssues$ = this.resolvedIssuesSource.asObservable();

  constructor(private http: HttpClient) { }

  // Issues endpoint
  fetchIssues() {
    const Path = this.baseURL + 'issues';
    return this.http.get<ComplaintsModel>(Path);
  }

  // Initialize the observable with new values everyone 5 mins
  initIssues() {
    Promise.resolve(this.issues)
      .then(() => {
        return interval(300000);
      });

  }
  // Init: Fetch all issues
  get issues() {
    return this.fetchIssues()
      .pipe(distinctUntilChanged())
      .subscribe((issues: ComplaintsModel) => {
        this.issuesSource.next(issues);
      });
  }

  // Init: Fetch all resolved issues
  get resolved() {
    return this.fetchResolved()
      .pipe(distinctUntilChanged())
      .subscribe((issues: ComplaintsModel) => {
        this.resolvedIssuesSource.next(issues);
      });
  }

  // Assign an issue to a team
  assignIssue(form: any) {
    const Path = this.baseURL + `assigned`;
    const payload: Assign = {
      issueId: form.issueId,
      roleId: form.roles.rId,
      comment: form.comment,
      response: false,
    };
    return this.http.post<Assign>(Path, payload, httpOptions);
  }

  // Assign an issue to a team
  reassignIssue(issue: { id: number; }, form: any) {
    const Path = this.baseURL + `assigned/reassigned`;
    const payload: Reassign = {
      asId: issue.id,
      comment: form.comment,
    };
    return this.http.post<Reassign>(Path, payload, httpOptions);
  }

  // Get Resolved Issues
  fetchResolved() {
    const Path = this.baseURL + `resolution`;
    return this.http.get<ComplaintsModel>(Path, httpOptions);
  }

  // Get the resolved issues log
  fetchLog(id: number) {
    const Path = this.baseURL + `resolvedissuelog?issId=` + id;
    return this.http.get<any>(Path, httpOptions);
  }

  // For setting a default role
  get roles() {
    const Path = this.baseURL + 'roles';
    return this.http.get<Roles>(Path, httpOptions);
  }

  // Mark issue as completed and Close an issue
  closeIssue(id: number) {
    const Path = this.baseURL + 'assigned/closeissue/' + id;
    const payload: any = {};
    return this.http.post<any>(Path, payload, httpOptions);
  }

  // Get an issue by issueID
}
