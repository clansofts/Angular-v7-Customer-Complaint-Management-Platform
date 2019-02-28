import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { UserService } from 'src/app/shared/services/user-service.service';

export interface AuthUserModel {
    access_token: string;
    token_type: string;
    expires_in: number;
    Role: string;
}

// Local form alert interface
interface Alert {
    type: string;
    message: string;
}

const ALERTS: Alert[] = [{
    type: 'success',
    message: 'Complaint recieved, A ticket has been sent to your email',
}, {
    type: 'info',
    message: 'No user found',
}, {
    type: 'warning',
    message: 'Cannot submit, form is invalid. please check your inputs and try again',
}
];

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
    alert: Alert;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private errorService: ErrorDialogService,
        private toastr: ToastrService,
        private localstoreService: LocalStoreService,
        private userService: UserService
    ) {
        // Alerts & init error handler
        this.alert = null;
        this.handleErrorFn();
    }

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
            .subscribe(async (response: AuthUserModel) => {
                if (response) {
                    // Store the current user object in the browser
                    this.localstoreService.setItem('currentUser', response);
                    // role based routing
                    try {
                        await this.userService.userRole(response);
                    } catch (error) {
                        console.error(error);
                        this.toastr.error('Error!', 'Invalid user type');
                    }
                    return;
                }
                // Handle form error
                this.toastr.error('Error!', 'Network Error');
                // Reset form
                this.ngOnInit();
            });
    }

    // Http network error
    errorDialog(data: any): void {
        Promise.resolve(this.toastr.error(data, 'Login Error'))
            .then(() => setTimeout(() => {
                this.loading = false;
                this.ngOnInit();
            }, 1000));
    }

    // Hangle error
    handleErrorFn() {
        this.errorService.onErrorObserver.pipe()
            .subscribe(e => this.errorDialog(e));
    }

    test() {
        setTimeout(() => {
            console.log('Testing 1 2 3');
        }, 1000);
    }

}
