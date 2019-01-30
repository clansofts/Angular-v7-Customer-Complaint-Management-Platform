import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private baseURL = environment.API.BaseURL;

  constructor(private http: HttpClient) { }
  // Fetch resource by endpoint
  fetch(endpoint: string): any {
    return this.http.get<any>(this.baseURL + endpoint);
  }

  // For tracking user flow.
  breadCrumbs(feedback, category): any {
    const Path = this.baseURL + `feedbackcategories`;
    const body: any = {
      'feedbackId': feedback,
      'categoryId': category
    };
    return this.http.post<any>(Path, body);
  }
}
