import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

export interface CustomerIssuesModel {
  errortype: string;
  status: string;
  fullname: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private baseURL = environment.API.BaseURL;

  constructor(private http: HttpClient, private utilities: UtilitiesService) { }

  // Track an issue by the issue ID
  trackIssue(body: any) {
    const Path = this.baseURL + `statusenquries/` + body.uid + '?email=' + body.email;
    return this.http.get<CustomerIssuesModel>(Path, httpOptions);
  }
}
