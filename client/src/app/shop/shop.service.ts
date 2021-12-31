import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IProduct} from "../shared/models/product";
import {IPagination, Pagination} from "../shared/models/pagination";
import {IBrand} from "../shared/models/brand";
import {IType} from "../shared/models/productType";
import {map, tap} from "rxjs/operators";
import {ShopParams} from "../shared/models/shopParams";
import {environment} from "../../environments/environment";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.baseUrl;
  brands: IBrand[] = [];
  types: IType[] = [];
  productPagination = new Pagination<IProduct>();
  shopParams = new ShopParams();
  productCache = new Map<string, IProduct[]>();

  constructor(private http: HttpClient) {
  }

  getProducts(useCache: boolean) {
    if (!useCache) {
      this.productCache = new Map();
    }
    if (this.productCache.size > 0 && useCache) {
      const key = Object.values(this.shopParams).join('-');
      if (this.productCache.has(key)) {
        this.productPagination.data = this.productCache.get(key);
        return of(this.productPagination);
      }
    }
    const params = this.getParams(this.shopParams);
    return this.http.get<IPagination<IProduct>>(`${this.baseUrl}products`, {observe: 'response', params})
      .pipe(map(response => {
          this.productCache.set(Object.values(this.shopParams).join('-'), response.body.data)
          this.productPagination = response.body;
          return this.productPagination;
        })
      );
  }

  getProduct(id: number) {
    let product: IProduct;
    this.productCache.forEach(products => {
      product = products.find(prod => prod.id === id);
    });
    if (product) return of(product);
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
  }

  getBrands() {
    if (this.brands.length > 0) return of(this.brands);
    return this.http.get<IBrand[]>(`${this.baseUrl}products/Brands`).pipe(tap(brands => this.brands = brands));
  }

  getProductTypes() {
    if (this.types.length > 0) return of(this.types);
    return this.http.get<IType[]>(`${this.baseUrl}products/Types`).pipe(tap(types => this.types = types));
  }

  private getParams(shopParams: ShopParams) {
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
    return params;
  }
}
