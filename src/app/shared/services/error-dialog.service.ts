import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private toastr: ToastrService) { }

  openDialog(data): void {
    this.toastr.error('Toastr error!', data, { timeOut: 3000 });
  }
}
