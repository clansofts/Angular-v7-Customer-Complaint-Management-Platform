import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) { }

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
}
