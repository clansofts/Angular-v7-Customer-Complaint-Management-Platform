import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = environment.API.AuthURL;

  // Only for demo purpose
  authenticated = true;

  constructor(
    private store: LocalStoreService,
    private router: Router,
    private http: HttpClient) {
    this.checkAuth();
  }

  checkAuth() {
    //  this.authenticated = this.store.getItem('login_status');
  }

  getuser() {
    return of({});
  }

  async signin(credentials: any) {
    const signInURL = this.baseURL + 'token';
    const payload = `grant_type=password&username=${credentials.email}&password=${credentials.password}`;
    try {
      const response = await this.http.post<any>(signInURL, payload, httpOptions).toPromise();
      this.authenticated = true;
      this.store.setItem('login_status', true);
      return response;
    } catch (error) {
      throw error;
    }
  }

  signout() {
    this.authenticated = false;
    this.store.clear();
    this.store.setItem('login_status', false);
    this.router.navigateByUrl('/sessions/signin');
  }
}
