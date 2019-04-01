import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDashboardComponent } from './team-dashboard.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminComponent } from '../../admin.component';

describe('TeamDashboardComponent', () => {
  let component: TeamDashboardComponent;
  let fixture: ComponentFixture<TeamDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDashboardComponent ],
      imports: [
        RouterTestingModule,
        SharedComponentsModule, 
        SharedModule,
        NgxDatatableModule
      ],
      providers: [AdminComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
