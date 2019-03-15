import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  @Input() formController: any;
  @Input() firstNameController: any;
  @Input() lastNameController: any;
  @Input() emailController: any;
  @Input() phoneController: any;

  constructor() { }

  ngOnInit() {
  }

}
