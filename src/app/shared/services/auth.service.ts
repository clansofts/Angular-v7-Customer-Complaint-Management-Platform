import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
    // this.authenticated = this.store.getItem("demo_login_status");
  }

  getuser() {
    return of({});
  }

  signin(credentials: any) {
    const signInURL = this.baseURL + 'token';
    const payload = `grant_type=password&username=${credentials.email}&password=${credentials.password}`;
    this.authenticated = true;
    this.store.setItem('demo_login_status', true);
    return this.http.post<any>(signInURL, payload);
  }
  signout() {
    this.authenticated = false;
    this.store.clear();
    this.store.setItem('demo_login_status', false);
    this.router.navigateByUrl('/sessions/signin');
  }
}
