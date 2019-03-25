import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  ResourceModel, UtilitiesService, BranchModel,
  FeedBackModel, ComplaintCategory, ErrorTypes
} from 'src/app/shared/services/utilities.service';
import { ComplaintsService, ComplaintsModel } from '../complaints.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';
import { DashboadDefaultComponent } from '../dashboad-default.component';

// Observable to track ticket status
const modalState = new Subject<any>();

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
  message: 'We apologize, Something went wrong somewhere',
}
];

@Component({
  selector: 'app-service-issue',
  templateUrl: './service-issue.component.html',
  styleUrls: ['./service-issue.component.scss']
})
export class ServiceIssueComponent implements OnInit {
  private feedbackId = 1; // complaint
  private categoryId = 2; // channel:1, service:2, staff: 3
  private channelId = 4; // ATM dispense error
  public formState: boolean; // Display complaints form as default.

  loading: boolean;
  serviceComplaintForm: FormGroup;
  branch_of_Issue: BranchModel[];
  feedbackCategory_ID: number;
  ComplaintTypes: ErrorTypes[];
  complaintCategoryHolder: ComplaintCategory[];

  // Form objects
  transCount: Array<ResourceModel> = [{ name: 'Single', id: 1 }, { name: 'Multiple', id: 2 }];

  // Alert and ticket id variables
  ticketID: any;
  alert: Alert;

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
    this.serviceComplaintFn();
    // display details form by default
    this.formState = true;
    return Promise.all([
      //   await this.fetch_feedbackID(),
      // These are get and set accessors for currency and card variant list: API.
      this.fetch_BranchList(),
      this.complaintCategory()
    ]).then(function () {
      console.log('application loaded successfully');
    }).catch(function () {
      console.log('An error occured while fetching resources');
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

  // Used to toggle between views
  set toggleNavigation(n: boolean) {
    this.formState = n;
  }

  get isCustomerFn() {
    return this.serviceComplaintForm.controls.isCustomer.value;
  }

  // Use to toggle single or multiple
  get selectedTransCount() {
    return this.serviceComplaintForm.controls.transCount.value.id;
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
      acctNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      emailAddress: ['', [Validators.required, Validators.email]],
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
      complaintDescription: ['', Validators.required],
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
      isCustomer: ['', [Validators.required]],
      disappointedService: [''],
      suggestionBox: [''],
      branchIncident: ['', [Validators.required]],
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
  open(content: any) {
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

  successModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(() => {
        this.resetForm();
        this.alert = ALERTS[0];
      });
  }

  async submit(form: { value: any; }) {
    if (this.serviceComplaintForm.valid) {
      this.errorSubmit = false;
      this.loading = true;
      try {
        // Register category feedback id at the backend
        const feedbackid = await this.fetch_feedbackID()
        await this.serviceComplaintForm.controls.feedbackId.setValue(feedbackid);

        // Handle form submition
        const payloadObject = new ComplaintsModel(form.value, this.utilities);
        await this.complaintsService.submitComplaint(payloadObject).toPromise()
          .then((response: any) => {
            this.loading = false;
            this.ticketID = response.uid;
            modalState.next(true);
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
    const firstName = this.serviceComplaintForm.controls.firstName.value;
    const lastName = this.serviceComplaintForm.controls.lastName.value;
    const fullName = `${firstName} ${lastName}`;
    return fullName;
  }

  // Accessor for form variables
  get email() {
    const email = this.serviceComplaintForm.controls.emailAddress.value;
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

  // Alert controls
  closeAlert(alert: Alert) {
    this.alert = null;
  }

  // Hangle error
  handleErrorFn() {
    this.errorService.onErrorObserver.pipe()
      .subscribe(e => this.errorDialog(e));
  }

  // Fetch complaint category
  complaintCategory(): void {
    this.utilities.fetch_Category(4).toPromise()
      .then(response => {
        this.complaintCategoryHolder = response;
      });
  }

  fetchErrorType(): void {
    const category: ComplaintCategory = this.serviceComplaintForm.controls.errorCategory.value;
    this.utilities.fetch_ErrorType(category.id).toPromise()
      .then((response: ErrorTypes[]) => {
        this.ComplaintTypes = response;
      });
  }


  test() {
    console.log('Testing');
  }

}
