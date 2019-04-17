import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

@Injectable({
  providedIn: 'root'
})
export class InternalTrackingService implements OnInit {
  private baseURL = environment.API.BaseURL;

  viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  page = 1;
  pageSize = 8;
  products: any[] = [];


  constructor(
    private utilities: UtilitiesService,
    private http: HttpClient,
    private dl: DataLayerService) { }

  ngOnInit(): void {
    this.dl.getProducts()
      .subscribe((products: any[]) => {
        this.products = products;
      });
  }

  trackIssue(form: { email: any; accountNumber: any; issueId: any; }) {
    const Path = this.baseURL + 'internalsearch';
    const payload: any = {
      firstName: '',
      lastName: '',
      email: form.email,
      acctNumber: form.accountNumber,
      issueId: form.issueId
    };
    // Trim payload
    this.utilities.trim(payload);
    return this.http.post<any>(Path, payload, httpOptions);
  }
}
