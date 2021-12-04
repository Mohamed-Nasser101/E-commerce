import {createReducer, on} from "@ngrx/store";
import {removeBasket, setBasket} from "../actions/basketItems.action";

export const initialState = null;

const _itemsReducer = createReducer(
  initialState,
  on(setBasket, (state, {basket}) => basket),
  on(removeBasket, (state) => null),
);

export function basketReducer(state, action) {
  return _itemsReducer(state, action);
}
