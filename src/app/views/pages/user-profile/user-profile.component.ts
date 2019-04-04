import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../administrator/admin.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private admin: AdminComponent) {
    this.admin.currentUserRole();
   }

  ngOnInit() {
  }

}
