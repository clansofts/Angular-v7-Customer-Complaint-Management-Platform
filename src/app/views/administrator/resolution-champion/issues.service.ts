import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ComplaintsModel } from '../../customer/customer-complaints/complaints.service';

@Injectable({
  providedIn: 'root'
})
export class IssuesResolutionService {
  private baseURL = environment.API.BaseURL;

  constructor(private http: HttpClient) { }

  // Get all issues
  issues() {
    const Path = this.baseURL + 'issues';
    return this.http.get<ComplaintsModel>(Path);
  }
}
