import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorDialogService } from '../services/error-dialog.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalHttpErrorInterceptor {
    // Catch errors glabally and pass to the error service
    constructor(private errorEvent: ErrorDialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
                    this.errorEvent.onErrorObserver.next('Something went wront');
                    return throwError(errorMessage);
                })
            );
    }
}
