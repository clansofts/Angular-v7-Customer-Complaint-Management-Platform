import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss']
})
export class TeamDashboardComponent implements OnInit {

  constructor(private admin: AdminComponent) {
    this.admin.currentUserRole();
  }

  ngOnInit() {
  }

}
