import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilitiesService, ResourceModel, ServiceProvider, FeedBackModel } from 'src/app/shared/services/utilities.service';
import { map } from 'rxjs/internal/operators/map';
import { ComplaintsModel, ComplaintsService } from '../complaints.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-e-channels-error',
  templateUrl: './e-channels-error.component.html',
  styleUrls: ['./e-channels-error.component.scss']
})
export class EChannelsErrorComponent implements OnInit {
  private feedbackId = 1; // feedback
  private categoryId = 1; // category
  private channelId = 3; // E-channels

  private _currencyType = 'currencyTypes';  // Endpoint

  eChannelsForm: FormGroup;
  loading: boolean;

  public personalDetails: boolean; // Display complaints form as default.
  currencyType: Array<ResourceModel>;
  serviceList: Promise<ServiceProvider>;
  card_Variants: Array<ResourceModel>;
  private _card_Variants = 'cardvariants'; // Endpoint.
  feedbackCategory_ID: number;

  // Transaction count
  transCount: Array<any> = [{ name: 'Single', id: 1 }, { name: 'Multiple', id: 2 }];
  POS_Web: Array<any> = [{ name: 'Point-of-sale (POS) ', id: 1 }, { name: 'Website', id: 2 }];

  // Enumerate?
  eChannelMedium: Array<any> = [
    { name: 'Union Mobile', id: 1 },
    { name: 'Online Banking', id: 2 },
    { name: 'POS/Web', id: 3 },
    { name: 'USSD', id: 4 },
    { name: 'Mcash', id: 5 }
  ];

  // Service Types
  serviceType: Array<any> = [
    { name: 'Airtime Top Up', id: 1 },
    { name: 'Bills Payment', id: 2 },
    { name: 'Transfer', id: 3 }
  ];

  // USSD Service Types
  ussdServiceType: Array<any> = [
    { name: 'Airtime Top Up', id: 4 },
    { name: 'Transfer', id: 5 },
    { name: 'Usage Issues', id: 6 }
  ];

  // Dummy Billers Types, API needed
  billerType: Array<any> = [
    { name: 'DSTV', id: 1 },
    { name: 'Electricity', id: 2 },
    { name: 'GOTV', id: 3 }
  ];


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private utilities: UtilitiesService,
    private complaintsService: ComplaintsService
  ) {
    // display details form by default
    this.personalDetails = true;
  }

  ngOnInit() {
    this.eChannelsFn();
    return Promise.all([
      this.fetchCurrencyType = this._currencyType,
      this.fetchCardVariants = this._card_Variants,
      this.serviceProviders(),
    ]);
  }

  // Used to toggle between views
  set toggleNavigation(n: boolean) {
    this.personalDetails = n;
  }

  // Fetch card variants
  set fetchCardVariants(path: string) {
    this.utilities.card_VariantsInit = path;
    this.utilities.card_Variants$
      .toPromise().then(response => {
        this.card_Variants = response;
        this.fetch_feedbackID();
      });
  }

  // Register service by fetching feedback categoryID
  fetch_feedbackID(): Promise<number> {
    return this.utilities.breadCrumbs(this.feedbackId, this.categoryId)
      .toPromise().then((response: FeedBackModel) => {
        this.feedbackCategory_ID = response.id;
      });
  }

  get selectServiceType() {
    return this.eChannelsForm.controls.eMedium.value.id;
  }

  get ussd_ServiceType() {
    return this.eChannelsForm.controls.eChannels.value.id;
  }

  // Use to toggle single or multiple
  get selectedTransCount() {
    return this.eChannelsForm.controls.transCount.value.id;
  }

  // Return selected Point of Card use
  get card_was_Used() {
    return this.eChannelsForm.controls.whereCardUsed.value.id;
  }

  // Fetch card variants
  set fetchCurrencyType(path: string) {
    this.utilities.fetch(path)
      .pipe(map((response: any) => {
        this.currencyType = response;
      }))
      .toPromise();
  }

  // Populate service providers
  serviceProviders(): ServiceProvider {
    return this.utilities.serviceProviders.toPromise()
      .then(response => {
        this.serviceList = response;
      });
  }

  // Reactive form control
  eChannelsFn(): void {
    this.eChannelsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cardNumber: ['', Validators.maxLength(4)],
      cardVariant: [''],
      acctNumber: [''],
      eChannels: [''],
      altphone: [''],
      transCount: [''],
      transDate: [''], // Defaults to today's date
      serviceProvider: [''],
      complaintDescription: [''],
      amount: this.fb.group({
        amount1: [''],
        amount2: [''],
        amount3: [''],
      }),
      currencyType: [''],
      eMedium: [''],
      feedbackId: [''],
      billType: [''],
      referenceID: [''],
      smartCardNumber: [''],
      unionMobilePhone: [''],
      recipientsAcctNo: [''],
      recipientsName: [''],
      whereCardUsed: [''],
      posMerchantName: [''],
      websiteURL: [''],
      ussdPhoneNo: [''],
      beneficiaryPhoneNo: [''],
    });
  }

  async submit(form: NgForm) {
    this.loading = true;
    await this.eChannelsForm.controls.feedbackId.setValue(this.feedbackCategory_ID);
    console.log(form.value);
    // Construct Payload Objecy
    const payloadObject: ComplaintsModel = {
      title: 1,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.emailAddress,
      phoneNo: form.value.phone,
      lastFourDigit: form.value.cardNumber,
      transactionType: form.value.transCount.id,
      transactionAmount: form.value.amount.amount1,
      transactionAmountTwo: form.value.amount.amount2,
      transactionAmountThree: form.value.amount.amount3,
      transactionDate: this.utilities.formatDate(form.value.transDate), // Format sample: '2019-01-29'
      sourceId: 1, // fixed for web
      channelId: this.channelId, // whether atm dispense error, card issue etc
      feedbackcategoryId: form.value.feedbackId, // Feedback categoryId
      cardVariantId: form.value.cardVariant,
      currencyTypeId: form.value.currencyType,
      eChannelMedium: form.value.eMedium.id,
      serviceType: form.value.eChannels.id,
      billType: form.value.billType,
      referenceId: form.value.referenceID,
      smartCardNumber: form.value.smartCardNumber,
      unionMobile: form.value.unionMobilePhone,
      recipientAccountNo: form.value.recipientsAcctNo,
      recipientName: form.value.recipientsName,
      posMerchantName: form.value.posMerchantName,
      websiteUsed: form.value.websiteURL,
      ussdPhoneNo: form.value.ussdPhoneNo,
      beneficiaryPhoneNo: form.value.beneficiaryPhoneNo,
      recipientBank: '',
      merchantCode: '',
      serviceProviderId: form.value.serviceProvider.serviceProviderId,
    };
    setTimeout(() => {
      this.complaintsService.submitComplaint(payloadObject)
        .toPromise().then(response => {
          console.log(response);
        });
      this.loading = false;
      /* this.toastr.success('Profile updated.', 'Success!', { progressBar: true }); */
    }, 3000);
  }

  test() {
    console.log('Notice me sempai!');
  }

}
