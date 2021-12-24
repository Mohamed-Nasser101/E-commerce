import {ActionReducerMap} from '@ngrx/store';
import {basketReducer} from "./reducers/basketReducer";
import {IBasket} from "../shared/models/basket";
import {IUser} from "../shared/models/user";
import {userReducer} from "./reducers/userReducer";
import {submittingOrderReducer} from "./reducers/submittingOrderReducer";

export interface State {
  basket: IBasket,
  user: IUser,
  submittingOrder: boolean
}

export const reducers: ActionReducerMap<State> = {
  basket: basketReducer,
  user: userReducer,
  submittingOrder: submittingOrderReducer
};
