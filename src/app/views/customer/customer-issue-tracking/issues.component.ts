import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesTrackingComponent implements OnInit {
  products$: any;
  bool: boolean;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
    console.log(this.products$);
    this.bool = true;
  }

  test() {
    this.bool = !this.bool;
  }

}
