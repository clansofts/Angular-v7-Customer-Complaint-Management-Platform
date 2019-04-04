import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private localStorage: LocalStoreService) { }

  set route(url: string) {
    this.router.navigateByUrl(url);
  }
  // Route the user to the appropriate dashboard
  async userRole(user?: any) {
    if (user.Role) {
      if (user.Role === 'RC') {
        // If resolution champion
        this.route = '/admin-rc';
        return;
      }
      // If resolution team
      this.route = '/admin-rt';
    }
  }

  // Get logged in user role
  get loggedInUser() {
    const user: any = this.localStorage.getItem('currentUser');
    if (user) {
      return user.Role;
    }
    return null;
  }

  get loggedInUserTeam() {
    const user: any = this.localStorage.getItem('currentUser');
    if (user) {
      return user.Team;
    }
    return null;
  }
}
