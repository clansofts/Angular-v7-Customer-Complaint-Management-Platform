import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, interval } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { distinctUntilChanged } from 'rxjs/operators';
import { ComplaintsModel } from '../../customer/customer-complaints/complaints.service';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

export interface AssignedIssuesModel {
  id: number;
  customer: string;
  errortype: string;
  errorDescription: string;
  teamAssigned: string;
  issue: ComplaintsModel;
  comment: string;
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
  initAssignments() {
    Promise.resolve(this.issues)
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

  // Assign an issue to a team member
  assignTo(id: number) {
    const Path = this.baseURL + 'assigned' + id;
    const payload: any = {
      statusId: 3,
    };
    return this.http.patch<any>(Path, payload, httpOptions);
  }
}
