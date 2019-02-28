import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../../admin.component';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ComposeDialogComponent } from '../compose-dialog/compose-dialog.component';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [SharedAnimations]
})
export class MessagesRTComponent implements OnInit {
  mails$: Observable<any>;
  selected: any;
  constructor(private admin: AdminComponent, private dl: DataLayerService,
    private modalService: NgbModal) {
    this.admin.currentUserRole();
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
