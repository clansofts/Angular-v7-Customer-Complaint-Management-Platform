import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../../admin.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private admin: AdminComponent) {
    this.admin.currentUserRole();
  }

  ngOnInit() {
  }

}
