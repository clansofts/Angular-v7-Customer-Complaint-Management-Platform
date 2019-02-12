import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilitiesService, ResourceModel, ServiceProvider, FeedBackModel } from 'src/app/shared/services/utilities.service';
import { map } from 'rxjs/internal/operators/map';
import { ComplaintsModel, ComplaintsService } from '../complaints.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

// Observable to track ticket status
const modalState = new BehaviorSubject(false);

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
  billTypes: Array<ResourceModel>;
  private _card_Variants = 'cardvariants'; // Endpoint.
  feedbackCategory_ID: number;
  ticketID: any;

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

   // Dummy Billers Types, API integration needed
   billerType: Array<any> = [
    { name: 'DSTV', id: 1 },
    { name: 'Electricity', id: 2 },
    { name: 'GOTV', id: 3 }
  ];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private utilities: UtilitiesService,
    private complaintsService: ComplaintsService,
    private modalService: NgbModal
  ) {
    // display details form by default
    this.personalDetails = true;
  }

  ngOnInit() {
    this.eChannelsFn();
    return Promise.all([
      this.fetchCurrencyType = this._currencyType,
      this.fetchCardVariants = this._card_Variants,
      this.billingsType, // getter
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

  // Fetch list of billers
  get billingsType() {
    return this.utilities.fetchBillTypes.pipe(map((response: ResourceModel[]) => {
      this.billTypes = response;
    })).toPromise();
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

  // Master Complaints Form
  eChannelsFn(): void {
    this.eChannelsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: [''],
      acctNumber: ['', Validators.maxLength(10)],
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
      cardVariant: [''],
      currencyType: [''],
      eMedium: ['', [Validators.required]],
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
    });
  }

  // Open modal to show ticket
  open(content) {
    modalState.subscribe(async state => {
      if (state === true) {
        await this.toastr.success('Please wait', 'Generating ticket!', { progressBar: true });
        setTimeout(() => {
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then((result) => {
              console.log(result);
            }, (reason) => {
              console.log('Err!', reason);
            });
        }, 4000);
      }
    });
  }

  async submit(form: NgForm) {
    if (this.eChannelsForm.valid) {
      this.loading = true;
      await this.eChannelsForm.controls.feedbackId.setValue(this.feedbackCategory_ID);
      const payloadObject = new ComplaintsModel(form.value, this.utilities);
      setTimeout(() => {
        this.complaintsService.submitComplaint(payloadObject)
          .toPromise().then((response: any) => {
            if (response && response.uid) {
              this.loading = false;
              this.ticketID = response.uid;
              modalState.next(true);
            }
          });
        this.loading = false;
      }, 3000);
      return;
    }
    alert('Form is not valid');
  }

  // Accessor for form variables
  get formatName() {
    const firstName = this.eChannelsForm.controls.firstName.value;
    const lastName = this.eChannelsForm.controls.lastName.value;
    const fullName = `${firstName} ${lastName}`;
    return fullName;
  }

  // Accessor for form variables
  get email() {
    const email = this.eChannelsForm.controls.emailAddress.value;
    return email;
  }

  test() {
    console.log(this.billingsType);
  }

}
