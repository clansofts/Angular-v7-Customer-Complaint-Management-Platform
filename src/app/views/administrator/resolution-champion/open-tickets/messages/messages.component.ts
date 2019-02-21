import { Component, OnInit } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { Observable, interval } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeDialogComponent } from '../compose-dialog/compose-dialog.component';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { IssuesResolutionService, Roles } from '../../issues.service';
import { ComplaintsModel } from 'src/app/views/customer/customer-complaints/complaints.service';
import { map } from 'rxjs/internal/operators/map';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
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
  confirmResut: string;
  Roles: Roles;

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
    this.fetchRoles();

    this.buildFormBasic();
    this.radioGroup = this.fb.group({
      radio: []
    });
  }

  select(issue) {
    this.selected = issue;
  }

  /* Have to create two form controls for both form */
  buildFormBasic() {
    this.formBasic = this.fb.group({
      roles: [],
      comment: []
    });
  }

  fetchRoles() {
    this.issuesService.roles.toPromise()
      .then(res => {
        this.Roles = res;
      }).then(() => {
        this.formBasic.controls.roles.setValue(this.Roles[0]);
      });
  }

  submit(form: NgForm) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      /* this.toastr.success('Profile updated.', 'Success!', { progressBar: true }); */
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result);
      }, (reason) => {
        console.log('Err!', reason);
      });
  }

  confirm(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.confirmResut = `Closed with: ${result}`;
      }, (reason) => {
        this.confirmResut = `Dismissed with: ${reason}`;
      });
  }

  get numTickets() {
    return;

  }

  test() {
    console.log('Running test');
    console.log('SAMA');
  }

}
