import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

// Interface ATM list
export interface ATMModel {
  location: string;
  atmId: number;
  issue: any;
}
// logging Model
export interface FeedBackModel {
  id: number;
  categoryId: number;
  category: string;
  feedbackId: number;
  feedback: string;
}
// Interface for card variant and currency type.
export interface ResourceModel {
  name: string;
  id: number;
}

// Interface for fetching Banks list.
export interface BankModel {
  nbankNme: string;
  bankId: number;
}

// Interface for fetching Branch list.
export interface BranchModel {
  branchId: number;
  branchLocation: string;
  sortCode: number;
}

// Interface ATM list
export interface ATMModel {
  location: string;
  atmId: number;
  issue: any;
}

// Service Provider Model
export interface ServiceProvider {
  serviceProvider: string;
  serviceProviderId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private baseURL = environment.API.BaseURL;

  // Shared Card Variants
  card_Variants$: Observable<ResourceModel[]>;

  constructor(private http: HttpClient) { }

  // Fetch resource by endpoint
  fetch(endpoint: string): any {
    return this.http.get<ResourceModel>(this.baseURL + endpoint);
  }

  set card_VariantsInit(endpoint: string) {
    this.card_Variants$ = this.http.get<ResourceModel[]>(this.baseURL + endpoint);
  }

  // For tracking user flow.
  breadCrumbs(feedback, category): any {
    const Path = this.baseURL + `feedbackcategories`;
    const body: any = {
      'feedbackId': feedback,
      'categoryId': category
    };
    return this.http.post<FeedBackModel>(Path, body);
  }

  // ATM list
  atmList(): any {
    const Path = this.baseURL + `atmlists`;
    return this.http.get<ATMModel>(Path);
  }

  // Bank list
  banksList(): any {
    const Path = this.baseURL + `otherbanks`;
    return this.http.get<BankModel>(Path);
  }

  // Branch list
  branchList(): any {
    const Path = this.baseURL + `branchlists`;
    return this.http.get<BranchModel>(Path);
  }

  // Types of bills
  get fetchBillTypes(): any {
    const Path = this.baseURL + `billtypes`;
    return this.http.get<ResourceModel>(Path);
  }

  // Date formater, format: 'yyyy-mm-dd'
  formatDate(date: any) {
    return date.year + '-' + date.month +
      '-' + date.day;
  }

  // Format date from JavaScript date function
  get todaysDate() {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) { dd = 0 + dd; }
    if (mm < 10) { mm = 0 + mm; }
    const newDate = yyyy + '/' + mm + '/' + dd;
    return newDate.toString();
  }

  // Clear or delete emypty strings from json object
  trim(payload: any) {
    const jsonBody = payload;
    Object.keys(jsonBody).forEach(function (key) {
      // If it's not a number of an empty string
      if (jsonBody[key] === null || jsonBody[key] === undefined || jsonBody[key] === '') {
        delete jsonBody[key];
      }
    });
    return;
  }

  // Fetch service providers
  get serviceProviders(): any {
    const Path = this.baseURL + `serviceproviders`;
    return this.http.get<ServiceProvider>(Path);
  }
}
