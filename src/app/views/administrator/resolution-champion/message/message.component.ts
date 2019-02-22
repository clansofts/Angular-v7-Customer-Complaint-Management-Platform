import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private admin: AdminComponent) { }

  ngOnInit() {
    this.admin.currentUserRole();
  }

}
