import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { UtilitiesService, FeedBackModel, ResourceModel, ATMModel, BankModel } from 'src/app/shared/services/utilities.service';
import { ComplaintsService, ComplaintsModel } from '../complaints.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

// To be global interface
interface Alert {
  type: string;
  message: string;
}

// Observable to track ticket status
const modalState = new BehaviorSubject(false);

const ALERTS: Alert = {
  type: 'warning',
  message: 'Form is invalid, please check inputs.',
};

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
  public formState: boolean; // Display complaints form as default.
  currencyType: Array<ResourceModel>;
  card_Variants: Array<ResourceModel>;
  ATM_location: Array<ATMModel>; // list of ATMs from API
  Bank_used: Array<BankModel>; // list of Banks
  feedbackCategory_ID: number;

  // Form objects
  transCount: Array<ResourceModel> = [{ name: 'Single', id: 1 }, { name: 'Multiple', id: 2 }];
  ATM_used: Array<ResourceModel> = [{ name: 'Union Bank', id: 1 }, { name: 'Other Bank', id: 2 }]; // list of ATMs

  private _card_Variants = 'cardvariants'; // Endpoint.
  private _currencyType = 'currencyTypes';  // Endpoint

  // Alert and ticket id variables
  ticketID: any;
  alertCards: Alert;
  alerts: Alert;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private utilities: UtilitiesService,
    private complaintsService: ComplaintsService,
    private modalService: NgbModal
  ) {
    // display details form by default
    this.formState = true;
    this.alerts = ALERTS;
    this.alertCards = ALERTS;
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

  // Alerts
  closeAlert(alert: Alert) {

  }

  closeAlertCard(alert: Alert) {

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

  // Fetch bank list
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
      phone: [''],
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
      cardVariant: ['', [Validators.required]], // Automatically fetch cardVariant
      currencyType: ['', [Validators.required]], // Defaults to Naira
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

  // Open modal to show ticket
  open(content) {
    modalState.subscribe(async state => {
      if (state === true) {
        await this.toastr.success('Generating ticket', 'Please wait!', { progressBar: true });
        setTimeout(() => {
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then((result) => {
              console.log(result);
              this.resetForm(this.atmDispenseErrorForm);
            }, (reason) => {
              console.log('Err!', reason);
            });
        }, 2700);
      }
    });
  }

  // Submit complaint
  async submit(form: NgForm) {
    if (this.atmDispenseErrorForm.valid) {
      this.loading = true;
      await (this.atmDispenseErrorForm.controls.feedbackId.setValue(this.feedbackCategory_ID));
      const payloadObject = new ComplaintsModel(form.value, this.utilities);
      await this.complaintsService.submitComplaint(payloadObject)
        .toPromise().then((response: any) => {
          setTimeout(() => {
            if (response && response.uid) {
              this.loading = false;
              this.ticketID = response.uid;
              modalState.next(true);
            }
          }, 2000);
        });
      return;
    }
    alert('Form is not valid');
  }

  // Accessor for form variables
  get formatName() {
    const firstName = this.atmDispenseErrorForm.controls.firstName.value;
    const lastName = this.atmDispenseErrorForm.controls.lastName.value;
    const fullName = `${firstName} ${lastName}`;
    return fullName;
  }

  // Accessor for form variables
  get email() {
    const email = this.atmDispenseErrorForm.controls.emailAddress.value;
    return email;
  }

  // Reset form and variables
  resetForm(form: any) {
    form.reset();
  }

  test() {
    //  console.log('');
  }

}
