import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesTrackingComponent implements OnInit {
  private feedbackId = 1; // feedback
  private categoryId = 1; // category
  private channelId = 2; // Card issue
  private _card_Variants = 'cardvariants'; // Endpoint.

  public issuesDetails: boolean;
  loading: boolean;
  bool: boolean; // Temp
  feedbackCategory_ID: number;

  issuesTrackingForm: FormGroup;

  products$: any; // Observable of issues


  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private utilities: UtilitiesService,
  ) { }

  ngOnInit() {
    this.issuesFn();
    this.products$ = this.productService.getProducts();
    console.log(this.products$);
    this.bool = true;
  }

  // Reactive form control
  issuesFn(): void {
    this.issuesTrackingForm = this.fb.group({
      emailAddress: ['', [Validators.required]],
      uid: ['', [Validators.required]],
    });
  }

  async submit(form: NgForm) {
    this.loading = true;
    setTimeout(() => {
      console.log(form.value);
      this.loading = false;
    }, 3000);
  }

  test() {
    this.bool = !this.bool;
  }

}
