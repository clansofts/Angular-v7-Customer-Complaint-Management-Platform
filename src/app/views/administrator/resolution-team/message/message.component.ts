import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageRTComponent implements OnInit {

  constructor(private admin: AdminComponent) {
    this.admin.currentUserRole();
  }

  ngOnInit() {
  }

}
