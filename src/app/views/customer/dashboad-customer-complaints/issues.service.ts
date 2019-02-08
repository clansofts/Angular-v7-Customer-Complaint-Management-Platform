import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';


@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private baseURL = environment.API.BaseURL;

  constructor(private http: HttpClient, private utilities: UtilitiesService) { }

  // Track an issue by the issue ID
  trackIssue(ticketid) {
    const Path = this.baseURL + `statusenquries/` + ticketid;
    return this.http.get<any>(Path);
  }
}
