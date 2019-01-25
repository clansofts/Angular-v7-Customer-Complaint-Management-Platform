import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './dashboard-v2.component.html',
  styleUrls: ['./dashboard-v2.component.scss']
})
export class DashboardV2Component implements OnInit {
	products$: any;

  constructor(
		private productService: ProductService
	) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
    console.log(this.products$);
  }

}
