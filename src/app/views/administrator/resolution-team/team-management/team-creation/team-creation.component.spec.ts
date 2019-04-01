import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCreationComponent } from './team-creation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from '../../../admin.component';

describe('TeamCreationComponent', () => {
  let component: TeamCreationComponent;
  let fixture: ComponentFixture<TeamCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCreationComponent ],
      imports: [
        RouterTestingModule, 
        ReactiveFormsModule, 
        FormsModule,
        LaddaModule,
        SharedComponentsModule, 
        SharedModule,
        HttpClientModule
      ],
      providers: [AdminComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
