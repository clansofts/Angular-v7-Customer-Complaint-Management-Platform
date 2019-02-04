import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResourceModel, ATMModel, BankModel, UtilitiesService, FeedBackModel } from 'src/app/shared/services/utilities.service';
import { ComplaintsService, ComplaintsModel } from '../complaints.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card-issue',
  templateUrl: './card-issue.component.html',
  styleUrls: ['./card-issue.component.scss']
})
export class CardIssueComponent implements OnInit, OnDestroy {
  private feedbackId = 1; // feedback
  private categoryId = 1; // category
  private channelId = 2; // Card issue

  cardIssueForm: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;
  public personalDetails: boolean; // Display complaints form as default.
  card_Variants: Array<ResourceModel>;
  // Make me an Enum sama :(
  cardComplaintType: Array<any> = [
    { name: 'Card Issuance', id: 1 },
    { name: 'Card Activation', id: 2 },
    { name: 'Bill Address', id: 3 },
    { name: 'Card Limit', id: 4 },
    { name: 'Card Functionality', id: 5 },
    { name: 'MasterCard Secure Code', id: 6 },
    { name: 'One Time Password "OTP" ', id: 7 },
    { name: 'Card Statement', id: 8 },
    { name: 'Repayment', id: 9 },
    { name: 'Charge Back', id: 10 }]; // list of ATMs
  private _card_Variants = 'cardvariants'; // Endpoint.
  feedbackCategory_ID: number;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private utilities: UtilitiesService,
    private complaintsService: ComplaintsService
  ) {
    // display details form by default
    this.personalDetails = true;
  }

  async ngOnInit() {
    this.cardIssueFn();
    return Promise.all([
      await this.fetch_feedbackID(),
      // These are get and set accessors for currency and card variant list: API.
      this.fetchCardVariants = this._card_Variants,
      // tslint:disable-next-line:no-unused-expression
      this.fetch_feedbackID()
    ]);
  }

  ngOnDestroy() {
    // subscribtions?
  }

  // Register service by fetching feedback categoryID
  fetch_feedbackID(): Promise<number> {
    return this.utilities.breadCrumbs(this.feedbackId, this.categoryId)
      .toPromise().then((response: FeedBackModel) => {
        this.feedbackCategory_ID = response.id;
      });
  }

  // Fetch card variants
  set fetchCardVariants(path: string) {
    this.utilities.card_VariantsInit = path;
    this.utilities.card_Variants$
      .toPromise().then(response => {
        this.card_Variants = response;
      });
  }

  // Used to toggle between views
  set toggleNavigation(n: boolean) {
    this.personalDetails = n;
  }

  // Reactive form control
  cardIssueFn(): void {
    this.cardIssueForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cardNumber: ['', Validators.maxLength(4)],
      cardVariant: [''],
      feedbackId: [''],
      complaintType: [''],
      complaintDescription: [''],
    });
  }

  async submit(form: NgForm) {
    this.loading = true;
    await this.cardIssueForm.controls.feedbackId.setValue(this.feedbackCategory_ID);
    // Construct payload
    const payloadObject: ComplaintsModel = {
      title: 1,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.emailAddress,
      phoneNo: form.value.phone,
      lastFourDigit: form.value.cardNumber,
      transactionDate: this.utilities.todaysDate, // Defaults to today's date

      sourceId: 1, // fixed for web, Abstract this
      channelId: this.channelId, // whether atm dispense error, card issue etc, Abstract this
      feedbackcategoryId: form.value.feedbackId, // Feedback categoryId
      cardVariantId: parseInt(form.value.cardVariant, 10),
      cardComplaintType: form.value.complaintType.id,
      complaintDescription: form.value.complaintDescription,
    };
    this.complaintsService.submitComplaint(payloadObject)
      .toPromise().then(response => {
        console.log(response);
      });

    setTimeout(() => {
      this.loading = false;
      /*  this.toastr.success('Profile updated.', 'Success!', { progressBar: true });*/
    }, 3000);
  }

  test() {
    console.log(this.utilities.todaysDate);
  }
}
