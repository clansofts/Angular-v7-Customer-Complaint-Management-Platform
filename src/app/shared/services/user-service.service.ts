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

  async userRole(user: any) {
    switch (user.Role) {
      // If resolution champion
      case 'RC':
        this.route = '/admin-rc';
        break;
      // If resolution team
      case 'RT':
        this.route = '/admin-rt';
        break;
    }
  }

}
