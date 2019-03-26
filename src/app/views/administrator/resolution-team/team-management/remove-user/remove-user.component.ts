import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../../admin.component';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss']
})
export class RemoveUserComponent implements OnInit {

  constructor(private admin: AdminComponent) {
    this.admin.currentUserRole();
   }

  ngOnInit() {
  }

}
