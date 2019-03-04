import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorDialogService } from '../services/error-dialog.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStoreService } from '../services/local-store.service';

@Injectable()
export class GlobalHttpErrorInterceptor {
    // Catch errors glabally and pass to the error service
    constructor(
        private errorEvent: ErrorDialogService,
        public authService: AuthService,
        public localhostService: LocalStoreService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Check if token exist in payload
        if (this.localhostService.getItem('currentUser')) {
            const currentUser = this.localhostService.getItem('currentUser');
            request = this.addToken(request, currentUser.access_token);
        }

        // For Testing purposes
        console.log(request);

        // Then handle error
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {

                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    console.error(error); // For testing purposes
                    this.errorEvent.onErrorObserver.next(errorMessage);
                    return throwError(errorMessage);
                })
            );
    }

    // Add the token to the payload
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
