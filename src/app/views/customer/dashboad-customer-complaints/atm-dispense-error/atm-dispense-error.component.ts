import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { single, map } from 'rxjs/operators';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

// Interface for card variant and currency type.
interface ResourceModel {
  name: string;
  id: number;
}

@Component({
  selector: 'app-atm-dispense-error',
  templateUrl: './atm-dispense-error.component.html',
  styleUrls: ['./atm-dispense-error.component.scss']
})
export class AtmDispenseErrorComponent implements OnInit, OnDestroy {
  atmDispenseError: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;
  public formState: boolean; // Display complaints form as default.
  currencyType: Array<ResourceModel>;
  card_Variants: Array<ResourceModel>;
  private moduleID = 1; // Complaints
  private channelID = 1; // ATM dispense error

  // Is this the best way?
  transCount: Array<any> = [{ name: 'Single', id: 1 }, { name: 'Multiple', id: 2 }];
  ATM_used: Array<any> = [{ name: 'Union Bank' }, { name: 'Other Bank' }]; // list of ATM's

  private _card_Variants = 'cardvariants'; // Endpoint.
  private _currencyType = 'currencyTypes';  // Endpoint

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private utilities: UtilitiesService
  ) {
    // display details form by default
    this.formState = true;
  }

  ngOnInit() {
    this.atmDispenseErrorFn();
    this.fetchCardVariants = this._card_Variants;
    this.fetchCurrencyType = this._currencyType;
  }

  ngOnDestroy() {
    // subscribtions?
  }

  // Fetch card variants
  set fetchCardVariants(path: string) {
    this.utilities.fetch(path)
      .pipe(map((response: any) => {
        this.card_Variants = response;
      }))
      .toPromise();
  }

  // Fetch card variants
  set fetchCurrencyType(path: string) {
    this.utilities.fetch(path)
      .pipe(map((response: any) => {
        this.currencyType = response;
      }))
      .toPromise();
  }

  // Used to toggle between views
  next = (): void => {
    this.formState = false;
    return;
  }
  previous = () => {
    this.formState = true;
    return;
  }
  // Use to toggle single or multiple
  transCountFn() {
    alert('clicked');
  }

  // Reactive form control
  atmDispenseErrorFn(): void {
    this.atmDispenseError = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cardNumber: ['', Validators.maxLength(4)],
      cardVariant: ['2'], // Automatically fetch cardVariant
      transDate: [''], // Defaults to today's date
      transCount: [''],
      amount: this.fb.group({
        amount1: [''],
        amount2: [''],
        amount3: [''],
      }),
      currencyType: [''], // Defaults to Naira
    });
  }

  async submit() {
    this.loading = true;
    /* Set an await function, breadcrumbs */
    setTimeout(() => {
      this.loading = false;
      this.toastr.success('Profile updated.', 'Success!', { progressBar: true });
    }, 3000);
  }

  log_tracking() {
    return this.utilities.breadCrumbs(this.moduleID, this.channelID)
      .toPromise().then(response => {
        console.log(response);
      });
  }
  test() {
    // console.log('');
  }
}
