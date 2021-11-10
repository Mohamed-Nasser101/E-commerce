import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IProduct} from "../shared/models/product";
import {IPagination} from "../shared/models/pagination";
import {IBrand} from "../shared/models/brand";
import {IType} from "../shared/models/productType";
import {map} from "rxjs/operators";
import {ShopParams} from "../shared/models/shopParams";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());
    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    return this.http.get<IPagination<IProduct>>(`${this.baseUrl}products`, {observe: 'response', params})
      .pipe(
        map(response => response.body)
      );
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
  }

  getBrands() {
    return this.http.get<IBrand[]>(`${this.baseUrl}products/Brands`);
  }

  getProductTypes() {
    return this.http.get<IType[]>(`${this.baseUrl}products/Types`);
  }
}
