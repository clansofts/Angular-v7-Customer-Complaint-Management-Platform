import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { IssuesService, CustomerIssuesModel } from './issues.service';
import { DashboadDefaultComponent } from '../customer-complaints/dashboad-default.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesTrackingComponent implements OnInit {
  public issuesDetails: boolean;
  loading: boolean;
  feedbackCategory_ID: number;
  issuesTrackingForm: FormGroup;
  complaints$: any; // Observable of issues
  errorSubmit: boolean;

  constructor(
    private fb: FormBuilder,
    private issuesService: IssuesService,
    private customerComponent: DashboadDefaultComponent,
    private toastr: ToastrService,
  ) {
    // Initialize module
    this.customerComponent.ngOnInit();
  }

  ngOnInit() {
    // Initialize the reactive form
    this.issuesFn();
  }

  // Reactive form control
  issuesFn(): void {
    this.issuesTrackingForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      uid: ['', [Validators.required]],
    });
  }

  async submit(form: { valid: any; value: { emailAddress: any; uid: any; }; reset: () => void; }) {
    if (form.valid) {
      this.loading = true;
      this.errorSubmit = false;
      const body = { email: form.value.emailAddress, uid: form.value.uid };
      try {
        await this.issuesService.trackIssue(body).toPromise()
          .then((response: CustomerIssuesModel) => {
            this.complaints$ = response;
            form.reset();
          });
        this.loading = false;
        return;
      } catch (err) {
        this.toastr.error(`${err}`, 'Error!', { closeButton: true });
      }
    }
    this.toastr.warning(`Form is invalid`, 'Warning!', { closeButton: true });
    this.errorSubmit = true;
  }

  test() {
    console.log('Test');
  }

}
