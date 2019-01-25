import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atm-dispense-error',
  templateUrl: './atm-dispense-error.component.html',
  styleUrls: ['./atm-dispense-error.component.scss']
})
export class AtmDispenseErrorComponent implements OnInit {
  formBuilderGroup: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.atmDispenseErrorForm();
    this.radioGroup = this.fb.group({
      radio: []
    });
  }

  atmDispenseErrorForm() {
    this.formBuilderGroup = this.fb.group({
      experience: [],
      firstName: [''],
      lastName: [''],
      emailAddress: ['']
    });
  }

  submit() {
    this.loading = true;
    console.log(this.formBuilderGroup);
    setTimeout(() => {
      this.loading = false;
      this.toastr.success('Profile updated.', 'Success!', { progressBar: true });
    }, 3000);
  }
}
