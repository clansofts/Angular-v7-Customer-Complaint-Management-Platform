import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'app-dashboard-resolution-champion',
  templateUrl: './dashboard-resolution-champion.component.html',
  styleUrls: ['./dashboard-resolution-champion.component.scss']
})
export class DashboardResolutionChampionComponent implements OnInit {

  constructor(private admin: AdminComponent
  ) { }

  ngOnInit() {
    this.admin.currentUserRole();
  }

}
