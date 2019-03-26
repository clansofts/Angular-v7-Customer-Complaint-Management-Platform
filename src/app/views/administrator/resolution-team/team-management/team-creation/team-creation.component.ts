import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../../admin.component';

@Component({
  selector: 'app-team-creation',
  templateUrl: './team-creation.component.html',
  styleUrls: ['./team-creation.component.scss']
})
export class TeamCreationComponent implements OnInit {

  constructor(private admin: AdminComponent) {
    this.admin.currentUserRole();
  }

  ngOnInit() {
  }

}
