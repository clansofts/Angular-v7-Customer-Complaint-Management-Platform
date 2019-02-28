import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ComplaintsModel } from '../../customer/customer-complaints/complaints.service';
import { distinctUntilChanged, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { interval } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class IssuesResolutionService {
  private baseURL = environment.API.BaseURL;

  private issuesSource = new BehaviorSubject<ComplaintsModel>(null);
  issues$ = this.issuesSource.asObservable();

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
  // Fetch all issues
  get issues() {
    return this.fetchIssues()
      .pipe(distinctUntilChanged())
      .subscribe((issues: ComplaintsModel) => {
        this.issuesSource.next(issues);
      });
  }

  // Assign an issue to a team
  assignIssue(form: any) {
    const Path = this.baseURL + `assigned`;
    const payload: Assign = {
      issueId: form.issueId,
      roleId: form.roles.roleId,
      comment: form.comment,
      response: false,
    };
    return this.http.post<Assign>(Path, payload);
  }

  // Get Resolved Issues
  fetchResolved() {
    const Path = this.baseURL + `assigned/resolvedissues`;
    return this.http.get<ComplaintsModel>(Path);
  }

  // For setting a default role
  get roles() {
    const Path = this.baseURL + 'roles';
    return this.http.get<Roles>(Path);
  }

  // Close an issue
  closeIssue(id: number) {
    const Path = this.baseURL + 'issues/' + id;
    const payload: any = {
      statusId: 3,
    };
    return this.http.patch<any>(Path, payload);
  }
}
