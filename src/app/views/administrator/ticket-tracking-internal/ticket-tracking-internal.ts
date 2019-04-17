import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InternalTrackingService } from './internal-tracking.service';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './ticket-tracking-internal.html',
  styleUrls: ['./ticket-tracking-internal.scss'],
  animations: [SharedAnimations]
})
export class TicketTrackingInternalComponent implements OnInit {
  internalIssuesForm: FormGroup;
  issues: any;

  viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  page = 1;
  pageSize = 8;
  products: any[] = [];

  constructor(
    private adminService: AdminComponent,
    private fb: FormBuilder,
    private issueTrackingService: InternalTrackingService,
    private dl: DataLayerService
  ) {
    this.adminService.currentUserRole();
  }

  ngOnInit() {
    this.createSearchForm();
    this.dl.getProducts()
      .subscribe((products: any[]) => {
        this.products = products;
      });
  }

  selectAll(e) {
    this.products = this.products.map(p => {
      p.isSelected = this.allSelected;
      return p;
    });

    if (this.allSelected) {

    }
    console.log(this.allSelected);
  }

  createSearchForm() {
    this.internalIssuesForm = this.fb.group({
      issueId: '',
      email: '',
      accountNumber: ''
    });
  }

  submit(form: { value: any; }) {
    this.issueTrackingService.trackIssue(form.value)
      .toPromise()
      .then(response => {
        console.log(response);
        this.issues = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  test() {
    console.log(this.issues);
  }
}
