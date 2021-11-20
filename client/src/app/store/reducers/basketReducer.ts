import {createReducer, on} from "@ngrx/store";
import {setBasket} from "../actions/basketItems.action";

export const initialState = null;

const _itemsReducer = createReducer(
  initialState,
  on(setBasket, (state, {basket}) => basket),
);

export function basketReducer(state, action) {
  return _itemsReducer(state, action);
}
