import {createAction, props} from "@ngrx/store";
import {IBasket} from "../../shared/models/basket";

export const setBasket = createAction('[basketItem component] INITIALIZE', props<{ basket: IBasket }>());
export const removeBasket = createAction('[basket component] REMOVE');
