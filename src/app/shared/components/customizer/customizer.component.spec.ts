import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomizerComponent } from './customizer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomizerComponent', () => {
  let component: CustomizerComponent;
  let fixture: ComponentFixture<CustomizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizerComponent],
      imports: [NgbModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizerComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
