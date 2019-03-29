import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResolutionChampionComponent } from './dashboard-resolution-champion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('DashboardResolutionChampionComponent', () => {
  let component: DashboardResolutionChampionComponent;
  let fixture: ComponentFixture<DashboardResolutionChampionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardResolutionChampionComponent],
      imports: [NgbModule,
        NgxDatatableModule,]
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
