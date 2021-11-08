import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {IPagination} from "../../shared/models/pagination";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  products: IPagination<IProduct>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
