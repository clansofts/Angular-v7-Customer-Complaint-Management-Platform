import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './ticket-tracking-internal.html',
  styleUrls: ['./ticket-tracking-internal.scss']
})
export class TicketTrackingInternalComponent implements OnInit {

  internalIssuesForm: FormGroup;

  constructor(
    private adminService: AdminComponent,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.adminService.currentUserRole();
  }

  ngOnInit() {
    this.createSearchForm();
  }

  createSearchForm() {
    this.internalIssuesForm = this.fb.group({
      issueId: '',
      email: '',
      accountNumber: ''
    });
  }

  test() {
    console.log(this.internalIssuesForm.value);
  }
}
