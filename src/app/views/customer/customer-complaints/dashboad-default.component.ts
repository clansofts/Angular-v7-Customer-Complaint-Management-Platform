import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboad-default',
    templateUrl: './dashboad-default.component.html',
    styleUrls: ['./dashboad-default.component.css']
})
export class DashboadDefaultComponent implements OnInit {

    constructor(private navigationService: NavigationService,
        private localstoreService: LocalStoreService, private router: Router) {
        this.currentUserRole();
    }

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
                case 'RT':
                    this.navigationMenu('admin2');
                    break;
            }
        } catch (error) {

            // If not a admin user
            console.log('Cannot find user');
            this.navigationMenu(null);
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
