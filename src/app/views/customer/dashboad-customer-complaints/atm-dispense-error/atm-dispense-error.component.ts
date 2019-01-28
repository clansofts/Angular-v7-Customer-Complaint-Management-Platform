import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atm-dispense-error',
  templateUrl: './atm-dispense-error.component.html',
  styleUrls: ['./atm-dispense-error.component.scss']
})
export class AtmDispenseErrorComponent implements OnInit {
  atmDispenseError: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;

  toggleForm = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.atmDispenseErrorFn();
    this.radioGroup = this.fb.group({
      radio: []
    });
  }

  atmDispenseErrorFn() {
    this.atmDispenseError = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cardNumber: [''],
      cardVariant: [''],// Automatically fetch cardVariant
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

  submit() {
    this.loading = true;
    console.log(this.atmDispenseError);
    setTimeout(() => {
      this.loading = false;
      this.toastr.success('Profile updated.', 'Success!', { progressBar: true });
    }, 3000);
  }

  testFn() {
    this.toggleForm = !this.toggleForm;
  }
}
