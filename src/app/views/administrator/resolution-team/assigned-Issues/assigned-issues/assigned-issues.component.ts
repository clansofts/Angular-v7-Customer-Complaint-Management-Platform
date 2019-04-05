import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComposeDialogComponent } from './compose-dialog/compose-dialog.component';
import { AdminComponent } from '../../../admin.component';

@Component({
  selector: 'app-assigned-issues',
  templateUrl: './assigned-issues.component.html',
  styleUrls: ['./assigned-issues.component.scss']
})
export class AssignedIssuesComponent implements OnInit {
  mails$: Observable<any>;
  selected: any;
  constructor(
    private dl: DataLayerService,
    private modalService: NgbModal,
    private adminService: AdminComponent
  ) {
    this.adminService.currentUserRole();
  }

  ngOnInit() {
    this.mails$ = this.dl.getMails();
  }

  select(mail) {
    this.selected = mail;
  }

  openComposeModal() {
    this.modalService.open(ComposeDialogComponent, { size: 'lg', centered: true });
  }

}
