import {ActionReducerMap} from '@ngrx/store';
import {basketReducer} from "./reducers/basketReducer";
import {IBasket} from "../shared/models/basket";

export interface State {
  basket: IBasket
}

export const reducers: ActionReducerMap<State> = {
  basket: basketReducer
};
