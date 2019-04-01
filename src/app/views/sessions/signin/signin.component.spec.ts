import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SessionsRoutingModule } from '../sessions-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { UserService } from 'src/app/shared/services/user-service.service';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentsModule,
        SharedDirectivesModule,
        SharedModule,
        NgbModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        AuthService,
        ToastrService,
        LocalStoreService,
        UserService,
        ErrorDialogService
      ],
      schemas: [
        //  NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
