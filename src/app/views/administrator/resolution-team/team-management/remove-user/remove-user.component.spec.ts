import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveUserComponent } from './remove-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LaddaModule } from 'angular2-ladda';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from '../../../admin.component';

describe('RemoveUserComponent', () => {
  let component: RemoveUserComponent;
  let fixture: ComponentFixture<RemoveUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveUserComponent ],
      imports: [
        RouterTestingModule, 
        ReactiveFormsModule, 
        FormsModule,
        LaddaModule,
        SharedComponentsModule, 
        SharedModule,
      ],
      providers: [AdminComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
