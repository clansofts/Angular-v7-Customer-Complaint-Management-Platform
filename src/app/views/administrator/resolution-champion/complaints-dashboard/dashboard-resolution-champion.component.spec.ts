import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardResolutionChampionComponent } from './dashboard-resolution-champion.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from '../../admin-routing.module';
import { MessageComponent } from '../message/message.component';
import { TeamDashboardComponent } from '../../resolution-team/team-dashboard/team-dashboard.component';
import { MessageRTComponent } from '../../resolution-team/message/message.component';
import { TeamCreationComponent } from '../../resolution-team/team-management/team-creation/team-creation.component';
import { RemoveUserComponent } from '../../resolution-team/team-management/remove-user/remove-user.component';
import { AdminComponent } from '../../admin.component';

describe('DashboardResolutionChampionComponent', () => {
  let component: DashboardResolutionChampionComponent;
  let fixture: ComponentFixture<DashboardResolutionChampionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardResolutionChampionComponent,
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [AdminComponent],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardResolutionChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
