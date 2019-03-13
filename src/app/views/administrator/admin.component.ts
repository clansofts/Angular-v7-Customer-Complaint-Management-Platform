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
    })
      .catch((error) => {
        console.error(error);
      });
  }

  // Control side-menu for each user type
  roleBasedRouting(user: any) {
    console.log(`setting user: ${user}`);
    if (user) {
      if (user.Role === 'RC') {
        this.navigationMenu('admin1');
        return;
      }
      if (user.Role === 'CS') {
        this.navigationMenu('admin3');
        return;
      }
      // If resolution team
      this.navigationMenu('admin2');
      return;
    }
    // If not an admin user, default to customer
    console.log('Cannot find user');
    this.navigationMenu(null);
  }

  navigationMenu(usertype: string) {
    console.log(usertype);
    this.navigationService.publishNavigationChange(usertype);
  }

  set route(url: string) {
    this.router.navigateByUrl(url);
  }

}
