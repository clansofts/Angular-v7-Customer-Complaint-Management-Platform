import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import {
  UtilitiesService, FeedBackModel, ResourceModel, ATMModel, BankModel,
  ComplaintCategory, ErrorTypes
} from 'src/app/shared/services/utilities.service';
import { ComplaintsService, ComplaintsModel } from '../complaints.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { DashboadDefaultComponent } from '../dashboad-default.component';

// Observable to track ticket status
const modalState = new Subject();

/* Abstract elements here to a global minterface*/

// Local form alert interface
interface Alert {
  type: string;
  message: string;
}

/* Wondering if NGXS can be utilized here to plan state changes on success and error? */
const ALERTS: Alert[] = [{
  type: 'success',
  message: 'Complaint recieved, A ticket has been sent to your email',
}, {
  type: 'info',
  message: 'This is an info alert',
}, {
  type: 'warning',
  message: 'Cannot submit, form is invalid. please check your inputs and try again',
}, {
  type: 'danger',
  message: 'This is a danger alert',
}, {
  type: 'primary',
  message: 'This is a primary alert',
}, {
  type: 'dark',
  message: 'This is a dark alert',
}
];

@Component({
  selector: 'app-atm-dispense-error',
  templateUrl: './atm-dispense-error.component.html',
  styleUrls: ['./atm-dispense-error.component.scss']
})
export class AtmDispenseErrorComponent implements OnInit, OnDestroy {
  private feedbackId = 1; // feedback-complaints
  private categoryId = 1; // channel:1, service:2, staff: 3
  private channelId = 1; // ATM dispense error
  public formState: boolean; // Display complaints form as default.
  private _card_Variants = 'cardvariants'; // Endpoint.
  private _currencyType = 'currencyTypes';  // Endpoint

  atmDispenseErrorForm: FormGroup;
  loading: boolean;
  currencyType: Array<ResourceModel>;
  card_Variants: Array<ResourceModel>;
  ATM_location: Array<ATMModel>; // list of ATMs from API
  Bank_used: Array<BankModel>; // list of Banks
  feedbackCategory_ID: number;

  // Form objects
  transCount: Array<ResourceModel> = [{ name: 'Single', id: 1 }, { name: 'Multiple', id: 2 }];
  ATM_used: Array<ResourceModel> = [{ name: 'Union Bank', id: 1 }, { name: 'Other Bank', id: 2 }]; // list of ATMs

  // Alert and ticket id variables
  ticketID: any;
  alert: Alert;
  ComplaintTypes: ErrorTypes[];
  complaintCategoryHolder: ComplaintCategory[];
  errorSubmit: boolean;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private utilities: UtilitiesService,
    private complaintsService: ComplaintsService,
    private modalService: NgbModal,
    private errorService: ErrorDialogService,
    private customerComponent: DashboadDefaultComponent
  ) {
    // Alerts & init error handler
    this.alert = null;
    this.handleErrorFn();
    this.customerComponent.ngOnInit();
  }

  async ngOnInit() {
    this.atmDispenseErrorFn();
    // display details form by default
    this.formState = true;
    return Promise.all([
      await this.fetch_feedbackID(),
      // These are get and set accessors for currency and card variant list: API.
      this.fetchCardVariants = this._card_Variants,
      this.fetchCurrencyType = this._currencyType,
      this.atmLocations,
      this.fetch_feedbackID(),
      this.fetch_BankList(),
      this.complaintCategory()
    ]).then(function () {
      console.log('application loaded successfully');
    }).catch(function () {
      console.log('An error occured while fetching resources');
    });
  }

  ngOnDestroy() {
    // subscribtions?
  }

  // Alert controls
  closeAlert(alert: Alert) {
    this.alert = null;
  }

  // Register service by fetching feedback categoryID
  async fetch_feedbackID(): Promise<number> {
    return await this.utilities
      .sendFeedback(this.feedbackId, this.categoryId)
      .toPromise()
      .then((response: FeedBackModel) => {
        return response.id;
      })
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
      acctNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.maxLength(15), Validators.pattern(new RegExp(/^[0-9\+]*$/))]],
      altphone: [''],
      cardNumber: ['', [Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      transCount: [''],
      amount: this.fb.group({
        amount1: [''],
        amount2: [''],
        amount3: [''],
      }),
      transDate: [''], // Defaults to today's date
      atmUsed: ['', [Validators.required]],
      cardComplaintType: [''],
      complaintDescription: ['', [Validators.required]],
      channel_ID: [this.channelId],
      feedbackId: [''],
      cardVariant: ['', [Validators.required]], // Automatically fetch cardVariant
      currencyType: [''], // UX: Defaults to Naira
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
      errorCategory: [''],
      errorType: ['']
    });
  }

  // Open modal to show ticket
  open(content: string): void {
    modalState.pipe(filter(val => val === true), distinctUntilChanged()).
      subscribe(async state => {
        if (state === true) {
          await this.toastr.success('Generating ticket', 'Please wait!', { timeOut: 2000, closeButton: true, progressBar: true });
          setTimeout(() => {
            this.successModal(content);
          }, 2500);
        }
        return;
      });
  }

  successModal(content: string): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(() => {
        this.resetForm();
        this.alert = ALERTS[0];
      });
  }

  // Submit complaint
  async submit(form: { value: any; }) {
    if (this.atmDispenseErrorForm.valid) {
      this.loading = true;
      this.errorSubmit = false;
      try {
        // Register category feedback id at the backend
        const feedbackid = await this.fetch_feedbackID()
        await this.atmDispenseErrorForm.controls.feedbackId.setValue(feedbackid);
        const payloadObject = new ComplaintsModel(form.value, this.utilities);
        await this.complaintsService.submitComplaint(payloadObject).toPromise()
          .then((response: any) => {
            this.loading = false;
            this.ticketID = response.uid;
          });
      } catch (err) {
        this.toastr.error(err, 'Error!', { closeButton: true });
      }
      return;
    }
    this.toastr.error('Form is invalid', 'Error!', { closeButton: true });
    this.alert = ALERTS[2];
    this.errorSubmit = true;
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
  resetForm() {
    this.ngOnInit();
    modalState.next(null);
  }

  // Open toast dialog
  errorDialog(data: string): void {
    Promise.resolve(this.toastr.error(data, 'Service Error', { closeButton: true }))
      .then(() => setTimeout(() => {
        this.loading = false;
      }, 1000));
  }

  // Hangle error
  handleErrorFn() {
    this.errorService.onErrorObserver.pipe()
      .subscribe(e => this.errorDialog(e));
  }

  // Fetch complaint category
  complaintCategory(): void {
    this.utilities.fetch_Category(1).toPromise()
      .then(response => {
        this.complaintCategoryHolder = response;
      });
  }

  fetchErrorType(): void {
    const category: ComplaintCategory = this.atmDispenseErrorForm.controls.errorCategory.value;
    this.utilities.fetch_ErrorType(category.id).toPromise()
      .then((response: ErrorTypes[]) => {
        this.ComplaintTypes = response;
      });
  }

  test() {
    console.log('Running Test');
    console.log(this.atmDispenseErrorForm);
    console.log(this.utilities.findInvalidControls(this.atmDispenseErrorForm));
  }

}
