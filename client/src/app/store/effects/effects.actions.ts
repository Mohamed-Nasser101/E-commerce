import { IBasketItem } from './../../shared/models/basket';
import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../shared/models/product";

export const loadBasket = createAction('[basketItem component] FIRST_LOAD');
export const addToBasket =
  createAction('[basketItem component] ADD_ITEM_TO_BASKET', props<{ item: IProduct, quantity: number }>());

export const incrementItem = createAction('[basketItem component] INCREMENT_ITEM_EFFECT', props<{ item: IBasketItem }>());
export const decrementItem = createAction('[basketItem component] DECREMENT_ITEM_EFFECT', props<{ item: IBasketItem }>());
export const removeItem = createAction('[basketItem component] REMOVE_ITEM_EFFECT', props<{ itemId: number }>());
