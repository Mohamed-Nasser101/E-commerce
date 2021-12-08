import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IOrder, IOrderItem} from "../shared/models/order";
import {IBasket, IBasketItem} from "../shared/models/basket";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getOrders() {
    return this.http.get<IOrder[]>(`${this.baseUrl}orders`);
  }

  getOrder(id: number) {
    return this.http.get<IOrder>(`${this.baseUrl}orders/${id}`);
  }

  convertToBasketItems(items: IOrderItem[]) {
    const itemsToReturn: IBasketItem[] = items.map(item => ({
      id: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      pictureUrl: item.pictureUrl,
      brand: '',
      type: ''
    }));
    const basket: IBasket = {
      id: '',
      items: itemsToReturn
    }
    return of(basket);
  }
}
