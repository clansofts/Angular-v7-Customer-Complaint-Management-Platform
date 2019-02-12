import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResolutionChampionComponent } from './dashboard-resolution-champion.component';

describe('DashboardResolutionChampionComponent', () => {
  let component: DashboardResolutionChampionComponent;
  let fixture: ComponentFixture<DashboardResolutionChampionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardResolutionChampionComponent ]
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
