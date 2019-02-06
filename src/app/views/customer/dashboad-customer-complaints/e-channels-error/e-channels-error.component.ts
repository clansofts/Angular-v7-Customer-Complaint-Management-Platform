import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilitiesService, ResourceModel, ServiceProvider, FeedBackModel } from 'src/app/shared/services/utilities.service';
import { map } from 'rxjs/internal/operators/map';

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
  private selectedMedium: number;
  currencyType: Array<ResourceModel>;
  serviceList: Promise<ServiceProvider>;
  card_Variants: Array<ResourceModel>;
  private _card_Variants = 'cardvariants'; // Endpoint.
  feedbackCategory_ID: number;

  // Transaction count
  transCount: Array<any> = [{ name: 'Single', id: 1 }, { name: 'Multiple', id: 2 }];
  POS_Web: Array<any> = [{ name: 'Point-of-sale (POS) ', id: 1 }, { name: 'Website', id: 2 }];

  // Make me an Enum sama :(
  eChannelMedium: Array<any> = [
    { name: 'Union Mobile', id: 1 },
    { name: 'Online Banking', id: 1 },
    { name: 'POS/Web', id: 3 },
    { name: 'USSD', id: 4 },
    { name: 'Card Functionality', id: 5 },
    { name: 'Mcash', id: 6 }
  ];

  // Service Types
  serviceType: Array<any> = [
    { name: 'Airtime Top Up', id: 1 },
    { name: 'Bills Payment', id: 2 },
    { name: 'Transfer', id: 3 }
  ];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private utilities: UtilitiesService,
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

  // Change view to selected medium
  onChange() {
    this.selectedMedium = this.eChannelsForm.controls.eChannels.value.id;
    return;
  }

  get selectServiceType() {
    return this.eChannelsForm.controls.eChannels.value.id;
  }

  // Use to toggle single or multiple
  get selectedTransCount() {
    return this.eChannelsForm.controls.transCount.value.id;
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
      billersCategory: [''],
      referenceID: [''],
      smartCardNumber: [''],
      unionMobilePhone: [''],
      recipientsPhone: [''],
      recipientsName: [''],
      whereCardUsed: [''],
      posMerchantName: [''],
      websiteURL: [''],
    });
  }

  submit(form: NgForm) {
    this.loading = true;
    setTimeout(() => {
      console.log(form.value);
      this.loading = false;
      /* this.toastr.success('Profile updated.', 'Success!', { progressBar: true }); */
    }, 3000);
  }

  test() {
    console.log('Running test');
  }

}
