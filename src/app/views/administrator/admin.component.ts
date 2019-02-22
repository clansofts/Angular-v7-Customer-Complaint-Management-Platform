import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private navigationService: NavigationService,
    private localstoreService: LocalStoreService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Read local storage
  currentUserRole() {
    console.log('Getting user');
    const user = Promise.resolve(this.localstoreService.getItem('currentUser'));
    user.then((u) => {
      this.roleBasedRouting(u);
    });
  }

  // Route user by role
  roleBasedRouting(user: any) {
    console.log('Routing user');
    try {
      switch (user.Role) {

        // If resolution champion
        case 'RC':
          this.navigationMenu('admin1');
          break;

        // If resolution team
        case 'DevOps':
          this.navigationMenu('admin2');
          break;
      }
    } catch (error) {

      // If not a admin user
      console.log('Cannot find user');
      this.navigationMenu(null);
      this.route = '';
    }
  }

  navigationMenu(usertype: string) {
    console.log(usertype);
    this.navigationService.publishNavigationChange(usertype);
  }

  set route(url: string) {
    this.router.navigateByUrl(url);
  }

}
