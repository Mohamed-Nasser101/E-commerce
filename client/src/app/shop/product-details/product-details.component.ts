import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "xng-breadcrumb";
import {ActivatedRoute} from "@angular/router";
import {IProduct} from "../../shared/models/product";
import {ShopService} from "../shop.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  product: IProduct;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private breadcrumb: BreadcrumbService) {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.breadcrumb.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.shopService.getProduct(this.productId).subscribe(prod => {
      this.breadcrumb.set('@productDetails', prod.name);
      this.product = prod;
    });
  }

}
