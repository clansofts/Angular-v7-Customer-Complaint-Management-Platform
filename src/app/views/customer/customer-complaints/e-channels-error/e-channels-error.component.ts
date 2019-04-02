import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  UtilitiesService, ResourceModel, ServiceProvider, FeedBackModel,
  ComplaintCategory, ErrorTypes
} from 'src/app/shared/services/utilities.service';
import { map } from 'rxjs/internal/operators/map';
import { ComplaintsModel, ComplaintsService } from '../complaints.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, from } from 'rxjs';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { filter, distinctUntilChanged } from 'rxjs/operators';
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
  selector: 'app-e-channels-error',
  templateUrl: './e-channels-error.component.html',
  styleUrls: ['./e-channels-error.component.scss']
})
export class EChannelsErrorComponent implements OnInit {
  private feedbackId = 1; // feedback
  private categoryId = 1; // channel:1, service:2, staff: 3
  private channelId = 3; // E-channels
  private _currencyType = 'currencyTypes';  // Endpoint
  private _card_Variants = 'cardvariants'; // Endpoint.
  public personalDetails: boolean; // Display complaints form as default.

  eChannelsForm: FormGroup;
  loading: boolean;
  currencyType: Array<ResourceModel>;
  serviceList: Promise<ServiceProvider>;
  card_Variants: Array<ResourceModel>;
  billTypes: Array<ResourceModel>;

  // Alert and ticket id variables
  alert: Alert;
  ticketID: any;
  ComplaintTypes: ErrorTypes[];
  complaintCategoryHolder: ComplaintCategory[];

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
    this.eChannelsFn();
    // display details form by default
    this.personalDetails = true;
    try {
      await Promise.all([
        this.fetchCurrencyType = this._currencyType,
        this.fetchCardVariants = this._card_Variants,
        this.billingsType,
        this.serviceProviders(),
        this.complaintCategory()
      ]);
      console.log('application loaded successfully');
    } catch (e) {
      console.log('An error occured while fetching resources');
    }
    try {
      this.eChannelsForm.controls.eChannels.setValue(this.serviceType[0].id);
    } catch (error) {
      throw (error);
    }
  }

  // Alert controls
  closeAlert(alert: Alert) {
    this.alert = null;
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
      });
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

  // Main mechnism for controlling the channel type toggle
  get selectServiceType() {
    try {
      return this.eChannelsForm.controls.errorCategory.value.id;
    } catch (error) {
      throw (error);
    }
  }

  // Inner Mechanism for controlling the selected service tyoe
  get complaintType() {
    return this.eChannelsForm.controls.eChannels.value.id;
  }

  get ussd_ComplaintType() {
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

  // Fetch list of billers
  get billingsType() {
    return this.utilities.fetchBillTypes.pipe(map((response: ResourceModel[]) => {
      this.billTypes = response;
    })).toPromise();
  }

  // Fetch card variants
  set fetchCurrencyType(path: string) {
    try {
      this.utilities.fetch(path)
        .pipe(map((response: any) => {
          this.currencyType = response;
        }))
        .toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  // Populate service providers
  serviceProviders(): ServiceProvider {
    return this.utilities.serviceProviders.toPromise()
      .then((response: Promise<ServiceProvider>) => {
        this.serviceList = response;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  // Master Complaints Form
  eChannelsFn(): void {
    this.eChannelsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: [''],
      acctNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(new RegExp(/^[0-9\+]*$/))],
      altphone: [''],
      cardNumber: ['', [Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      transCount: [''],
      amount: this.fb.group({
        amount1: [''],
        amount2: [''],
        amount3: [''],
      }),
      transDate: ['', [Validators.required]], // Defaults to today's date
      atmUsed: [''],
      cardComplaintType: [''],
      complaintDescription: ['', Validators.required],
      channel_ID: [this.channelId],
      feedbackId: [''],
      cardVariant: [''],
      currencyType: [''],
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
      unionatmId: [''],
      branchListId: [''],
      serviceProvider: [''],
      whereCardUsed: [''], // web or pos
      errorCategory: ['', [Validators.required]],
      errorType: ['']
    });
  }

  // Open modal to show ticket
  open(content: any) {
    modalState.pipe(
      filter(val => val === true),
      distinctUntilChanged())
      .subscribe(async state => {
        if (state === true) {
          await this.toastr.success('Generating ticket', 'Please wait!', { timeOut: 3000, closeButton: true, progressBar: true });
          setTimeout(() => {
            this.successModal(content);
          }, 4500);
        }
      });
  }

  successModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(() => {
        this.resetForm();
        this.alert = ALERTS[0];
      });
  }

  async submit(form: { value: any; }) {
    if (this.eChannelsForm.valid) {
      this.loading = true;
      this.errorSubmit = false;
      try {
        // Register category feedback id at the backend
        const feedbackid = await this.fetch_feedbackID()
        await this.eChannelsForm.controls.feedbackId.setValue(feedbackid);
        const payloadObject = new ComplaintsModel(form.value, this.utilities);
        await this.complaintsService.submitComplaint(payloadObject).toPromise()
          .then((response: any) => {
            if (response && response.uid) {
              this.loading = false;
              this.ticketID = response.uid;
              modalState.next(true);
            }
          })
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
    try {
      const firstName = this.eChannelsForm.controls.firstName.value;
      const lastName = this.eChannelsForm.controls.lastName.value;
      const fullName = `${firstName} ${lastName}`;
      return fullName
    } catch (err) {
      console.log(err)
    };
  }

  // Accessor for form variables
  get email() {
    const email = this.eChannelsForm.controls.emailAddress.value;
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
    try {
      this.utilities.fetch_Category(3).toPromise()
        .then(response => {
          this.complaintCategoryHolder = response;
        });
    } catch (eror) {

    }
  }

  fetchErrorType(): void {
    const category: ComplaintCategory = this.eChannelsForm.controls.errorCategory.value;
    this.utilities.fetch_ErrorType(category.id).toPromise()
      .then((response: ErrorTypes[]) => {
        this.ComplaintTypes = response;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
