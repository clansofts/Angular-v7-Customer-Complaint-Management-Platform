import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  public onErrorObserver = new Subject<any>();

  constructor() { }
}
