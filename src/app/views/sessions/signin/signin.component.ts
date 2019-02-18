import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { delay } from 'rxjs/internal/operators/delay';

export interface AuthUserModel {
    access_token: string;
    token_type: string;
    expires_in: number;
    Role: string;
}

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private navigationService: NavigationService
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });
        this.createSignInForm();
    }

    createSignInForm() {
        this.signinForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    signin() {
        this.loading = true;
        this.loadingText = 'Sigining in...';
        this.auth.signin(this.signinForm.value)
            .pipe(delay(1500))
            .subscribe((res: AuthUserModel) => {
                if (res) {
                    switch (res.Role) {
                        case 'RC':
                            this.navigationMenu = 'admin1';
                            this.route = '/admin-rc';
                            break;
                        case 'DevOps':
                            this.navigationMenu = 'admin2';
                            this.route = '/admin-rt';
                            break;
                    }
                    this.loading = false;
                    return;
                } else {
                    alert('Login Error!');
                    this.loading = false;
                    this.route = '/customer';
                }

            });
    }

    set navigationMenu(usertype: string) {
        this.navigationService.publishNavigationChange(usertype);
    }

    set route(url: string) {
        console.log(url);
        this.router.navigateByUrl(url);
    }

}
