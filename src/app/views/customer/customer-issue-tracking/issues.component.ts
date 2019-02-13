import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { IssuesService, CustomerIssuesModel } from './issues.service';

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

  products$: any; // Observable of issues


  constructor(
    private fb: FormBuilder,
    private issuesService: IssuesService
  ) { }

  ngOnInit() {
    // Initialize the reactive form
    this.issuesFn();
  }

  // Reactive form control
  issuesFn(): void {
    this.issuesTrackingForm = this.fb.group({
      emailAddress: ['', [Validators.required]],
      uid: ['', [Validators.required]],
    });
  }

  submit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      const body = { email: form.value.emailAddress, uid: form.value.uid };
      setTimeout(async () => {
        await this.issuesService.trackIssue(body).toPromise()
          .then((response: CustomerIssuesModel) => {
            this.products$ = response;
          });
        this.loading = false;
      }, 2000);
      return;
    }
    alert('form is invalid');
  }

  test() {
    console.log('omae wa mou shindeiru');
    setTimeout(() => {
      console.log('NANI');
    }, 500);
  }

}
