import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IProduct} from "../shared/models/product";
import {ShopService} from "./shop.service";
import {IBrand} from "../shared/models/brand";
import {IType} from "../shared/models/productType";
import {ShopParams} from "../shared/models/shopParams";
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) search: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount: number;
  shopParams: ShopParams;
  sortOption = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: low to high', value: 'priceAsc'},
    {name: 'Price: high to low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.shopParams;
  }

  ngOnInit(): void {
    this.getBrand();
    this.getTypes();
    this.getProducts(true);
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(
      result => {
        this.products = result.data;
        this.totalCount = result.count;
      }, error => console.log(error));
  }

  getBrand() {
    this.shopService.getBrands()
      .subscribe(result => this.brands = [{id: 0, name: 'All'}, ...result], error => console.log(error));
  }

  getTypes() {
    this.shopService.getProductTypes()
      .subscribe(result => this.types = [{id: 0, name: 'All'}, ...result], error => console.log(error));
  }

  onBrandSelected(id: number) {
    this.shopService.shopParams.brandId = id;
    this.shopService.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(id: number) {
    this.shopService.shopParams.typeId = id;
    this.shopService.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortChange(event: Event) {
    this.shopService.shopParams.sort = (<HTMLInputElement>event.target).value;
    this.getProducts();
  }

  onPageChange(event: PageChangedEvent) {
    if (this.shopService.shopParams.pageNumber !== event.page) {
      this.shopService.shopParams.pageNumber = event.page;
      this.getProducts(true);
    }
  }

  onSearch() {
    this.shopService.shopParams.search = this.search.nativeElement.value;
    this.shopService.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.search.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.shopParams = this.shopParams;
    this.getProducts();
  }

}
