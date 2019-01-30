import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private baseURL = environment.API.BaseURL;

  constructor(private http: HttpClient) { }

  /* Is there a way to tie this function to it's return type? Do I need a global interface */

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

  /* To speed up the applications, I'll like to schedule resource fetching
  to a web worker when the application loads.
  That should be none blocking. To fetch all form resources asynchronously*/
}
