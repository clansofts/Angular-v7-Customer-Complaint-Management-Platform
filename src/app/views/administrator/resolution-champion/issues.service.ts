import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ComplaintsModel } from '../../customer/customer-complaints/complaints.service';
import { distinctUntilChanged, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { interval } from 'rxjs';

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

  // Initialize the observable with new values everyone 2 mins
  initIssues() {
    Promise.resolve(this.issues)
      .then(() => {
        return interval(120000)
          // tslint:disable-next-line:no-unused-expression
          .subscribe(() => { this.issues; });
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
}
