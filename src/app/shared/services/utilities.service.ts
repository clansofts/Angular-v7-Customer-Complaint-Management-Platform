import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

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

// Complaint Category Model
export interface ComplaintCategory {
  category: string;
  channelType: any;
  escMail: null;
  escPersonel: null;
  id: number;
}

export interface ErrorTypes {
  cbncode: string;
  id: number;
  issueCategory: any;
  name: string;
  sla: number;
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
    return this.http.get<ResourceModel>(this.baseURL + endpoint, httpOptions);
  }

  set card_VariantsInit(endpoint: string) {
    this.card_Variants$ = this.http.get<ResourceModel[]>(this.baseURL + endpoint, httpOptions);
  }

  // For tracking user flow.
  sendFeedback(feedback: number, category: number): any {
    const Path = this.baseURL + `feedbackcategories`;
    const body: any = {
      'feedbackId': feedback,
      'categoryId': category
    };
    return this.http.post<FeedBackModel>(Path, body, httpOptions);
  }

  // ATM list
  atmList(): any {
    const Path = this.baseURL + `atmlists`;
    return this.http.get<ATMModel>(Path, httpOptions);
  }

  // Bank list
  banksList(): any {
    const Path = this.baseURL + `otherbanks`;
    return this.http.get<BankModel>(Path, httpOptions);
  }

  // Branch list
  branchList(): any {
    const Path = this.baseURL + `branchlists`;
    return this.http.get<BranchModel>(Path, httpOptions);
  }

  // Types of bills
  get fetchBillTypes(): any {
    const Path = this.baseURL + `billtypes`;
    return this.http.get<ResourceModel>(Path, httpOptions);
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
    return this.http.get<ServiceProvider>(Path, httpOptions);
  }

  // Fetch the categories for each complaint
  fetch_Category(code: number) {
    const Path = `http://10.65.0.86/api/issuecategories?ctid=${code}`;
    return this.http.get<Array<ComplaintCategory>>(Path, httpOptions);
  }

  // Fetch the error type for each category
  fetch_ErrorType(code: number) {
    const Path = `http://10.65.0.86/api/issuecategories/sub?ctid=${code}`;
    return this.http.get<Array<ErrorTypes>>(Path, httpOptions);
  }

  // Find invalid form controls, used for form validation
  findInvalidControls(form: any) {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

   // Call sort method
   sortBy(arr: any, field: string) {
    arr.sort(this.dynamicSort(field));
  }

  // Sorts objects by their value  passed
  dynamicSort(property: string) {
    let sortOrder = -1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }
}
