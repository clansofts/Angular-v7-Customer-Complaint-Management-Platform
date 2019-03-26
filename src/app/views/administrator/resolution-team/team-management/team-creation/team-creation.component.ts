import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../../../admin.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AssignedService } from '../../assigned.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-creation',
  templateUrl: './team-creation.component.html',
  styleUrls: ['./team-creation.component.scss']
})
export class TeamCreationComponent implements OnInit {
  teamCreationForm: any;

  constructor(
    private admin: AdminComponent,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private assignedService: AssignedService
  ) {
    this.admin.currentUserRole();
  }

  ngOnInit() {
    this.createAssignmentForm();
  }

  createAssignmentForm(): void {
    this.teamCreationForm = this.fb.group({
      username: ['', [Validators.required]],
    });
  }

  async submit(form: any): Promise<any> {
    const username: string = form.value.username;
    try {
      const User: any = await this.assignedService.createUser(username).toPromise()
        .then((response: any) => {
          console.log(response);
          return this.toastr.success(`${response}`, 'Created!', { closeButton: true });
        })
      console.log(User);
    } catch (err) {
      this.toastr.error(`${err}`, 'Error!', { closeButton: true });
    }
  }

}