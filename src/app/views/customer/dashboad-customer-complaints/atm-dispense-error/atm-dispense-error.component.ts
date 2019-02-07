import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, Form, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { UtilitiesService, FeedBackModel, ResourceModel, ATMModel, BankModel } from 'src/app/shared/services/utilities.service';
import { ComplaintsService, ComplaintsModel } from '../complaints.service';

@Component({
  selector: 'app-atm-dispense-error',
  templateUrl: './atm-dispense-error.component.html',
  styleUrls: ['./atm-dispense-error.component.scss']
})
export class AtmDispenseErrorComponent implements OnInit, OnDestroy {
  private feedbackId = 1; // feedback
  private categoryId = 1; // category
  private channelId = 1; // ATM dispense error

  atmDispenseErrorForm: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;
  public formState: boolean; // Display complaints form as default.
  currencyType: Array<ResourceModel>;
  card_Variants: Array<ResourceModel>;
  ATM_location: Array<ATMModel>; // list of ATMs from API
  Bank_used: Array<BankModel>; // list of Banks

  // Is this the best way?
  transCount: Array<any> = [{ name: 'Single', id: 1 }, { name: 'Multiple', id: 2 }];
  ATM_used: Array<any> = [{ name: 'Union Bank', id: 1 }, { name: 'Other Bank', id: 2 }]; // list of ATMs
  /* Enum? Because I should track by Id, and still be able to reference the name */

  private _card_Variants = 'cardvariants'; // Endpoint.
  private _currencyType = 'currencyTypes';  // Endpoint
  dummystate: boolean;
  feedbackCategory_ID: number;

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
    this.atmDispenseErrorFn();
    return Promise.all([
      await this.fetch_feedbackID(),
      // These are get and set accessors for currency and card variant list: API.
      this.fetchCardVariants = this._card_Variants,
      this.fetchCurrencyType = this._currencyType,
      this.atmLocations,
      this.fetch_feedbackID(),
      this.fetch_BankList()
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

  // Fetch card variants
  set fetchCurrencyType(path: string) {
    this.utilities.fetch(path)
      .pipe(map((response: any) => {
        this.currencyType = response;
      }))
      .toPromise();
  }

  // Application Resource
  get atmLocations(): ATMModel {
    return this.utilities.atmList()
      .toPromise().then((response: any) => {
        this.ATM_location = response;
        return this.ATM_location;
      });
  }

  fetch_BankList(): BankModel {
    return this.utilities.banksList()
      .toPromise().then((response: BankModel[]) => {
        this.Bank_used = response;
        return this.Bank_used;
      });
  }

  // Used to toggle between views
  set toggleNavigation(n: boolean) {
    this.formState = n;
  }
  // Use to toggle single or multiple
  get selectedTransCount() {
    return this.atmDispenseErrorForm.controls.transCount.value.id;
  }

  // ATM: whether Union Bank or Other
  get selected_ATM() {
    return this.atmDispenseErrorForm.controls.atmUsed.value.id;
  }

  // Reactive form control
  atmDispenseErrorFn(): void {
    this.atmDispenseErrorForm = this.fb.group({
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
    await this.atmDispenseErrorForm.controls.feedbackId.setValue(this.feedbackCategory_ID);
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
    //  console.log('');
  }

}
