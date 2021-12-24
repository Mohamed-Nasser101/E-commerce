import {IBasketTotals} from '../shared/models/basket';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Basket, IBasket, IBasketItem} from "../shared/models/basket";
import {Store} from "@ngrx/store";
import {State} from "../store";
import {IProduct} from "../shared/models/product";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private store: Store<State>) {
  }

  loadBasket() {
    const id = localStorage.getItem('basket_id');
    return id ? this.http.get<IBasket>(`${this.baseUrl}basket?id=${id}`) : of(null);
  }

  addItemToBasket(basket: IBasket, item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapItem(item, quantity);
    let newBasket: IBasket = Object.keys(basket).length === 0 && basket.constructor === Object
      ? this.createBasket()
      : Object.assign(basket);
    newBasket = {id: newBasket.id, items: [...this.addOrUpdateItems(newBasket.items, itemToAdd)]};
    return this.setBasket(newBasket);
  }

  getTotals(shippingPrice: number = 0): Observable<IBasketTotals> {
    return this.store.select(s => s.basket).pipe(map(basket => {
      const shipping = shippingPrice;
      const subtotal = basket?.items?.reduce((a, b) => (b.quantity * b.price) + a, 0);
      const total = subtotal + shipping;
      return {total, subtotal, shipping};
    }));
  }

  incrementItem(basket: IBasket, item: IBasketItem): Observable<IBasket> {
    let foundItem = basket.items.find(i => i.id === item.id);
    const newItem: IBasketItem = {...foundItem, quantity: (foundItem.quantity + 1)}
    const newBasketItems = basket.items.map(i => i.id === newItem.id ? newItem : i);
    const newBasket: IBasket = {...basket, items: newBasketItems}
    return this.setBasket(newBasket);
  }

  decrementItem(basket: IBasket, item: IBasketItem): Observable<IBasket> {
    let foundItem = basket.items.find(i => i.id === item.id);
    let newBasketItems: IBasketItem[];
    if (foundItem.quantity > 1) {
      const newItem: IBasketItem = {...foundItem, quantity: (foundItem.quantity - 1)}
      newBasketItems = basket.items.map(i => i.id === newItem.id ? newItem : i);
    } else {
      newBasketItems = basket.items.filter(i => i.id !== item.id);
    }
    const newBasket: IBasket = {...basket, items: newBasketItems}
    return this.setBasket(newBasket);
  }

  removeItem(basket: IBasket, itemId: number) {
    const newBasketItems = basket.items.filter(i => i.id !== itemId);
    const newBasket: IBasket = {...basket, items: newBasketItems}
    return this.setBasket(newBasket);
  }

  removeLocalBasket() {
    localStorage.removeItem('basket_id');
  }

  removeBasket() {
    const basketId = localStorage.getItem('basket_id');
    return this.http.delete<null>(`${this.baseUrl}basket?id=${basketId}`)
      .pipe(map(() => this.removeLocalBasket()));
  }

  createPaymentIntent(basketId: string) {
    return this.http.post<IBasket>(`${this.baseUrl}payments/${basketId}`, {});
  }

  updateBasket(basket: IBasket) {
    return this.http.post<IBasket>(`${this.baseUrl}basket`, basket);
  }

  private setBasket(basket: IBasket) {
    return basket.items.length > 0
      ? this.http.post<IBasket>(`${this.baseUrl}basket`, basket)
      : this.http.delete<null>(`${this.baseUrl}basket?id=${basket.id}`);
  }

  private createBasket() {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      quantity,
      type: item.productType,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand
    };
  }

  private addOrUpdateItems(items: IBasketItem[], itemToAdd: IBasketItem) {
    const index = items?.findIndex(item => item.id === itemToAdd.id);
    if (index === -1) {
      return [...items, itemToAdd]
    }
    let newQuantity = items[index].quantity + itemToAdd.quantity;
    return items.map((item, i) => {
      if (i !== index) return item
      return {...itemToAdd, quantity: newQuantity};
    });
  }
}
