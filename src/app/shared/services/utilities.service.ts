import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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

// Interface ATM list
export interface ATMModel {
  location: string;
  atmId: number;
  issue: any;
}

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  private baseURL = environment.API.BaseURL;

  constructor(private http: HttpClient) { }

  // Fetch resource by endpoint
  fetch(endpoint: string): any {
    return this.http.get<ResourceModel>(this.baseURL + endpoint);
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

  // ATM list
  banksList(): any {
    const Path = this.baseURL + `otherbanks`;
    return this.http.get<BankModel>(Path);
  }

  // Date formater
  formatDate(date: any) {
    return date.year + '-' + date.month +
      '-' + date.day;
  }

  // Clear or delete emypty strings from json object
  del_frmBody(payload: any) {
    const jsonBody = payload;
    Object.keys(jsonBody).forEach(function (key) {
      // If it's not a number of an empty string
      if (jsonBody[key] === null || jsonBody[key] === undefined || jsonBody[key] === '') {
        delete jsonBody[key];
      }
    });
    return;
  }
}
