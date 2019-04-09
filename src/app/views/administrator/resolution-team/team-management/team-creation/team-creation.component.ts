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
  loading: boolean;

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
    this.loading = true;
    try {
      const username: string = form.value.username;
      const User: any = await this.assignedService.createUser(username).toPromise()
      if (User) {
        User.then((response: any) => {
          this.loading = false;
          return this.toastr.success(`${response}`, 'Created!', { closeButton: true });
        }).
          catch((err: any) => {
            this.toastr.error(`${err}`, 'Error!', { closeButton: true });
            this.loading = false;
          })
        return;
      }
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.toastr.error(`${err}`, 'Error!', { closeButton: true });
      this.loading = false;
    }
  }
}
