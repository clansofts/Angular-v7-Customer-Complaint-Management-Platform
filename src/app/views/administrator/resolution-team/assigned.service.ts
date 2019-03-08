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
    await Promise.resolve(this.issues)
      .then(() => {
        return interval(300000);
      });

  }
  // Fetch all assigned issues
  get issues() {
    return this.fetchAssignments()
      .pipe(distinctUntilChanged())
      .subscribe((issues: AssignedIssuesModel) => {
        this.assignmentSource.next(issues);
      });
  }

  // Get team members
  get teams() {
    const Path = this.baseURL + 'teams';
    return this.http.get<Teams>(Path, httpOptions);
  }

  // Assign an issue to a team member
  assignTo(form?: any) {
    const Path = this.baseURL + 'teams/assign';
    const payload: any = {
      tId: form.teamId.id, // teamId
      assignId: form.assignId, // assigned issue id
      message: form.comment,
    };
    return this.http.post<any>(Path, payload, httpOptions);
  }

  // Mark as resolved
  resolved(i: any) {
    console.log(i);
    const Path = this.baseURL + 'assigned/resolved/' + i;
    const payload: any = {};
    return this.http.post<any>(Path, payload, httpOptions);
  }

  // Reject an issue
  reject(i: any) {
    const Path = this.baseURL + 'assigned/rejected/' + i;
    const payload: any = {};
    return this.http.post<any>(Path, payload, httpOptions);
  }
}
