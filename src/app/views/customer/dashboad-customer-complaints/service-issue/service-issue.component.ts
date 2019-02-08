import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResourceModel, UtilitiesService, BranchModel, FeedBackModel } from 'src/app/shared/services/utilities.service';
import { ComplaintsService, ComplaintsModel } from '../complaints.service';

@Component({
  selector: 'app-service-issue',
  templateUrl: './service-issue.component.html',
  styleUrls: ['./service-issue.component.scss']
})
export class ServiceIssueComponent implements OnInit {
  private feedbackId = 1; // feedback
  private categoryId = 1; // category
  private channelId = 4; // ATM dispense error

  loading: boolean;
  serviceComplaintForm: FormGroup;
  public formState: boolean; // Display complaints form as default.
  branch_of_Issue: BranchModel[];
  feedbackCategory_ID: number;

  services: Array<ResourceModel> = [
    { name: 'Staff Atitude', id: 1 },
    { name: 'Branch Ambience', id: 2 },
    { name: 'Service Rendered', id: 3 },
    { name: 'Loans', id: 4 },
    { name: 'Account Management', id: 1 },
    { name: 'Investments', id: 1 },
    { name: 'Excess Charges', id: 1 },
    { name: 'Fraud', id: 1 },
    { name: 'Others', id: 1 }];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private utilities: UtilitiesService,
    private complaintsService: ComplaintsService
  ) {
    // display details form by default
    this.formState = true;
  }

  async ngOnInit() {
    this.serviceComplaintFn();
    return Promise.all([
      await this.fetch_feedbackID(),
      // These are get and set accessors for currency and card variant list: API.
      this.fetch_BranchList()
    ]);
  }

  // Register service by fetching feedback categoryID
  fetch_feedbackID(): Promise<number> {
    return this.utilities.breadCrumbs(this.feedbackId, this.categoryId)
      .toPromise().then((response: FeedBackModel) => {
        this.feedbackCategory_ID = response.id;
      });
  }

  // Used to toggle between views
  set toggleNavigation(n: boolean) {
    this.formState = n;
  }

  get isCustomerFn() {
    return this.serviceComplaintForm.controls.isCustomer.value;
  }

  fetch_BranchList(): BranchModel {
    return this.utilities.branchList()
      .toPromise().then((response: BranchModel[]) => {
        this.branch_of_Issue = response;
        return this.branch_of_Issue;
      });
  }

  // Reactive form control
  serviceComplaintFn(): void {
    this.serviceComplaintForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: [''],
      acctNumber: [''],
      emailAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      altphone: [''],
      cardNumber: ['', Validators.maxLength(4)],
      transCount: [''],
      amount: this.fb.group({
        amount1: [''],
        amount2: [''],
        amount3: [''],
      }),
      transDate: [''], // Defaults to today's date
      atmUsed: [''],
      cardComplaintType: [''],
      complaintDescription: [''],
      channel_ID: [this.channelId],
      feedbackId: [''],
      cardVariant: [''], // Automatically fetch cardVariant
      currencyType: [''], // Defaults to Naira
      eMedium: [''],
      billType: [''],
      eChannels: [''],
      referenceID: [''],
      smartCardNumber: [''],
      unionMobilePhone: [''],
      recipientsAcctNo: [''],
      recipientsName: [''],
      posMerchantName: [''],
      websiteURL: [''],
      ussdPhoneNo: [''],
      beneficiaryPhoneNo: [''],
      recipientBank: [''],
      merchantCode: [''],
      isCustomer: [''],
      disappointedService: [''],
      suggestionBox: [''],
      branchIncident: [''],
      bankused: [''], // bankNameId: if other bank
      unionatmId: [''], // if unionbank, then location
      branchListId: [''],
      serviceProvider: [''],
      whereCardUsed: [''], // web or pos
    });
  }

  async submit(form: NgForm) {
    this.loading = true;
    await this.serviceComplaintForm.controls.feedbackId.setValue(this.feedbackCategory_ID);
    const payloadObject = new ComplaintsModel(form.value, this.utilities);
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
    console.log(this.isCustomerFn);
  }

}
