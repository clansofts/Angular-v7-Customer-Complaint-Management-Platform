import { Component, OnInit } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { Observable, interval } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeDialogComponent } from '../compose-dialog/compose-dialog.component';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { IssuesResolutionService } from '../../issues.service';
import { ComplaintsModel } from 'src/app/views/customer/customer-complaints/complaints.service';
import { map } from 'rxjs/internal/operators/map';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [SharedAnimations]
})
export class MessagesComponent implements OnInit {
  mails$: Observable<any>;
  Issues$: ComplaintsModel;

  selected: any;

  formBasic: FormGroup;
  loading: boolean;
  radioGroup: FormGroup;

  constructor(
    private dl: DataLayerService,
    private modalService: NgbModal,
    private issuesService: IssuesResolutionService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.mails$ = this.dl.getMails();
    // Initialize the issues service
    this.issuesService.initIssues();
    // store all issues in Issues$ variable
    this.allIssues();

    this.buildFormBasic();
    this.radioGroup = this.fb.group({
      radio: []
    });
  }

  select(issue) {
    this.selected = issue;
  }

  buildFormBasic() {
    this.formBasic = this.fb.group({
      experience: []
    });
  }

  submit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.toastr.success('Profile updated.', 'Success!', { progressBar: true });
    }, 3000);
  }

  // get issues from observable
  async allIssues() {
    await this.issuesService.issues$
      .pipe(distinctUntilChanged())
      .subscribe((res: ComplaintsModel) => {
        this.Issues$ = res;
      });
  }

  openComposeModal() {
    this.modalService.open(ComposeDialogComponent, { size: 'lg', centered: true });
  }

  get numTickets() {
    return;

  }

  test() {
    console.log('Running test');
    console.log('SAMA');
  }

}
