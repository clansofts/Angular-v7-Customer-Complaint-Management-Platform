import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResourceModel, UtilitiesService, FeedBackModel, ComplaintCategory, ErrorTypes } from 'src/app/shared/services/utilities.service';
import { ComplaintsService, ComplaintsModel } from '../complaints.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/internal/Subject';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { DashboadDefaultComponent } from '../dashboad-default.component';

// Observable to track ticket status
const modalState = new Subject();

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
  selector: 'app-card-issue',
  templateUrl: './card-issue.component.html',
  styleUrls: ['./card-issue.component.scss']
})
export class CardIssueComponent implements OnInit, AfterContentInit, OnDestroy {
  private feedbackId = 1; // complaint
  private categoryId = 1; // channel:1, service:2, staff: 3
  private channelId = 2; // Card issue
  private _card_Variants = 'cardvariants'; // Endpoint.
  private complaintCategoryHolder: Array<ComplaintCategory>; // Holds the various complaint types/categories
  public personalDetails: boolean; // Display complaints form as default.

  cardIssueForm: FormGroup;
  loading: boolean;
  card_Variants: Array<ResourceModel>;
  feedbackCategory_ID: number;

  // Alert and ticket id variables
  ticketID: any;
  alert: Alert;

  // Make Enum type?
  cardComplaintTypes: Array<any>;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private utilities: UtilitiesService,
    private complaintsService: ComplaintsService,
    private modalService: NgbModal,
    private errorService: ErrorDialogService,
    private navigationService: NavigationService,
    private customerComponent: DashboadDefaultComponent
  ) {
    // Alerts & init error handler
    this.alert = null;
    this.handleErrorFn();
    this.customerComponent.ngOnInit();
  }

  async ngOnInit() {
    this.cardIssueFn();
    // display details form by default
    this.personalDetails = true;
    return Promise.all([
      await this.fetch_feedbackID(),
      // These are get and set accessors for currency and card variant list: API.
      this.fetchCardVariants = this._card_Variants,
      this.fetch_feedbackID(),
      // Mutate complaint category holder, wish for more functional code.
      this.complaintCategory()
    ]).then(function () {
      console.log('application loaded successfully');
    }).catch(function () {
      console.log('An error occured while fetching resources');
    });
  }

  ngAfterContentInit() {
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
    return await this.utilities.sendFeedback(this.feedbackId, this.categoryId)
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
      cardComplaintType: ['', [Validators.required]],
      complaintDescription: ['', [Validators.required]],
      channel_ID: [this.channelId],
      feedbackId: [''],
      cardVariant: ['', [Validators.required]], // Automatically fetch cardVariant
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
      errorCategory: [''],
    });
  }

  // Open modal to show ticket
  open(content: string): void {
    modalState.pipe(
      filter(val => val === true),
      distinctUntilChanged())
      .subscribe(async state => {
        if (state === true) {
          await this.toastr.success('Generating ticket', 'Please wait!', { timeOut: 2000, closeButton: true, progressBar: true });
          setTimeout(() => {
            this.successModal(content);
          }, 2500);
        }
      });
  }

  successModal(content: string): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(() => {
        this.resetForm();
        this.alert = ALERTS[0];
      });
  }

  async submit(form: { valid: any; value: any; }) {
    if (form.valid) {
      this.loading = true;
      await this.cardIssueForm.controls.feedbackId.setValue(this.feedbackCategory_ID);
      const payloadObject = new ComplaintsModel(form.value, this.utilities);
      this.complaintsService.submitComplaint(payloadObject)
        .toPromise().then((response: any) => {
          console.log(response);
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
    this.toastr.error('Form is invalid', 'Error!', { closeButton: true });
    this.alert = ALERTS[2];
  }

  // Accessor for form variables
  get formatName() {
    const firstName = this.cardIssueForm.controls.firstName.value;
    const lastName = this.cardIssueForm.controls.lastName.value;
    const fullName = `${firstName} ${lastName}`;
    return fullName;
  }

  // Accessor for form variables
  get email() {
    const email = this.cardIssueForm.controls.emailAddress.value;
    return email;
  }

  // Reset form and variables
  resetForm() {
    this.ngOnInit();
    modalState.next(null);
  }

  // Open toast dialog
  errorDialog(data: string): void {
    Promise.resolve(this.toastr.error(data, 'Network Error'))
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
    this.utilities.fetch_Category(2).toPromise()
      .then(response => {
        this.complaintCategoryHolder = response;
      });
  }

  fetchErrorType(): void {
    const category: ComplaintCategory = this.cardIssueForm.controls.errorCategory.value;
    this.utilities.fetch_ErrorType(category.id).toPromise()
      .then((response: ErrorTypes[]) => {
        this.cardComplaintTypes = response;
      });
  }

  test() {
    console.log('Testing');

  }
}
