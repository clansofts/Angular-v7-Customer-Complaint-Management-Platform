import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, interval, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { distinctUntilChanged, delay } from 'rxjs/operators';
import { ComplaintsModel } from '../../customer/customer-complaints/complaints.service';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

export interface Teams {
  email: string;
  id: number;
  name: string;
  team: null;
  title: string;
}

export interface AssignedIssuesModel {
  id: number;
  customer: string;
  errortype: string;
  errorDescription: string;
  teamAssigned: string;
  assignedTo: number;
  issue: ComplaintsModel;
  comment: string;
  status: any;
}

@Injectable({
  providedIn: 'root'
})
export class AssignedService {
  private baseURL = environment.API.BaseURL;
  private assignmentSource = new BehaviorSubject<AssignedIssuesModel>(null);
  assignments$ = this.assignmentSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  // Issues endpoint
  fetchAssignments() {
    const Path = this.baseURL + 'assigned';
    return this.http.get<AssignedIssuesModel>(Path, httpOptions);
  }

  // Initialize the observable with new values everyone 5 mins
  async initAssignments() {
    try {
      await Promise.resolve(this.issues)
        .then(() => {
          return interval(300000);
        });
    } catch (err) {
      throw err;
    }
  }
  // Fetch all assigned issues
  get issues() {
    try {
      return this.fetchAssignments()
        .pipe(distinctUntilChanged())
        .subscribe((issues: AssignedIssuesModel) => {
          this.assignmentSource.next(issues);
        });
    } catch (err) {
      throw err;
    }
  }

  // Get team members
  get teams() {
    try {
      const Path = this.baseURL + 'teams';
      return this.http.get<Teams>(Path, httpOptions);
    } catch (err) {
    }
  }

  // Assign an issue to a team member
  assignTo(form?: any) {
    try {
      const Path = this.baseURL + 'teams/assign';
      const payload: any = {
        tId: form.teamId.id, // teamId
        assignId: form.assignId, // assigned issue id
        message: form.comment,
      };
      return this.http.post<any>(Path, payload, httpOptions);
    } catch (err) {
      throw err
    }
  }

  // Mark as resolved
  resolved(i: any, form: any) {
    try {
      const Path = this.baseURL + 'assigned/resolved/' + i.id;
      const payload: any = {
        rtName: form.resolverName,
        issueDescription: form.issue,
        causeOfIssue: form.cause,
        actionTaken: form.actionTaken,
        issueId: i.issueId,
        tag: ''
      };
      return this.http.post<any>(Path, payload, httpOptions);
    } catch (err) {
      throw err;
    }
  }

  // Reject an issue
  reject(i: any, comment: string) {
    try {
      const Path = this.baseURL + 'assigned/rejected';
      const payload: any = {
        asId: i,
        comment: comment
      };
      return this.http.post<any>(Path, payload, httpOptions);
    } catch (err) {
      throw err
    }
  }

  // Create a new Team member
  createUser(username: any) {
    try {
      const Path = this.baseURL + 'teams';
      const payload: any = {
        username: username
      };
      return this.http.post<any>(Path, payload, httpOptions);
    } catch (err) {
      throw err
    }
  }
}
