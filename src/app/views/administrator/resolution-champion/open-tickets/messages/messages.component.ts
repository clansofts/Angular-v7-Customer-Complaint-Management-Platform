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

  constructor(
    private dl: DataLayerService,
    private modalService: NgbModal,
    private issuesService: IssuesResolutionService
  ) {

  }

  ngOnInit() {
    this.mails$ = this.dl.getMails();
    // Initialize the issues service
    this.issuesService.initIssues();
    // store all issues in Issues$ variable
    this.allIssues();
  }

  select(issue) {
    this.selected = issue;
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
    console.log(this.Issues$);
  }

}
